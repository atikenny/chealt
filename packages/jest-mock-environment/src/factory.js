const { findMocksForUrl } = require('./mockUtils');
const { startCollecting, getCoverage } = require('./coverage/index');
const { writeFileSafe } = require('./fileUtils');

const factory = async ({ config: configParam, page, mocks, logger } = {}) => {
  let runningTestName;
  const config = {
    dataRequestResourceTypes: ['fetch', 'xhr'],
    notInterceptedUrls: ['browser-sync'],
    isPortAgnostic: false,
    isHostAgnostic: false,
    printCoverageSummary: false,
    recordCoverageText: false,
    shouldUseMocks: false,
    ...configParam
  };
  const findMocks = findMocksForUrl(config);
  const responses = {};
  const coverages = {};
  const getMockResponse = ({
    requestDetails: { url, method }
  }) => {
    const testMocks = mocks && mocks[runningTestName];
    const testMocksForUrl = testMocks && findMocks(testMocks, url);
    const hasMockResponses = testMocksForUrl && testMocksForUrl.length;
    const mockResponseIndex =
      hasMockResponses &&
      testMocksForUrl.findIndex((mock) => mock.method === method);
    const mockResponse =
      hasMockResponses && mockResponseIndex !== -1
        ? testMocksForUrl.splice(mockResponseIndex, 1)[0] // we remove the element from the array
        : undefined;

    return mockResponse;
  };
  const getResponseDetails = async (response, url) => {
    let body;
    let json;
    let text;
    const status = response.status();
    const statusText = response.statusText();
    const headers = response.headers();

    try {
      json = await response.json();
    } catch {
      try {
        text = await response.text();
      } catch {
        // sometimes the response is no longer available when we try to parse it
        // this might be a bug in puppeteer, therefore we don't do anything
        logger.debug(`Could not read response for url: ${url}, text: ${text}`);

        return undefined;
      }
    }

    if (json) {
      body = json;
    } else {
      body = text;
    }

    return {
      headers,
      status,
      statusText,
      body
    };
  };

  const interceptRequest = async (request) => {
    const { dataRequestResourceTypes, notInterceptedUrls } = config;
    const requestResourceType = request.resourceType();
    const isDataRequest = dataRequestResourceTypes.includes(
      requestResourceType
    );
    const url = request.url();
    const shouldInterceptUrl = !notInterceptedUrls.some(
      (notInterceptedUrl) => url.includes(notInterceptedUrl)
    );
    const headers = request.headers();
    const method = request.method();
    const shouldInterceptRequest =
            shouldInterceptUrl && isDataRequest;
    const requestDetails = {
      url,
      headers,
      method
    };

    if (shouldInterceptRequest) {
      logger.debug(`Intercepting request with url: ${url}`);
      const mockResponse = getMockResponse({
        mocks,
        runningTestName,
        requestDetails
      });

      if (mockResponse) {
        logger.debug(
          `Responding with mock: ${JSON.stringify(
            mockResponse.body
          )}, for url: ${url}`
        );
        await request.respond({
          status: mockResponse.status,
          headers: mockResponse.headers,
          body: JSON.stringify(mockResponse.body)
        });

        return;
      }

      if (mocks) {
        logger.debug(`Could not find mock for url: ${url}`);
      }

      if (!responses[runningTestName]) {
        responses[runningTestName] = {};
      }

      responses[runningTestName][url] = [];

      const response = request.response();

      if (response) {
        const details = await getResponseDetails(response);

        if (details) {
          responses[runningTestName][url].push({
            url,
            method,
            ...details
          });
        }
      }
    } else {
      logger.debug(`Request not intercepted for url: ${url}`);
    }

    request.continue();
  };

  const saveResponse = async (response) => {
    const url = response.url();
    const originalRequest =
            responses[runningTestName] && responses[runningTestName][url];

    if (originalRequest) {
      const details = await getResponseDetails(response, url);
      const request = response.request();
      const method = request.method();

      if (details) {
        logger.debug(`Intercepting response for url: ${url}`);
        originalRequest.push({
          url,
          method,
          ...details
        });
      }
    }
  };

  const setTestName = (testName) => {
    runningTestName = testName;
  };

  const getResponses = () => responses;

  // CODE COVERAGE
  const startCollectingCoverage = () => startCollecting(page);
  const stopCollectingCoverage = async () => {
    const { collectCoverageFrom, recordCoverageText } = config;

    coverages[runningTestName] = await getCoverage({
      page,
      collectCoverageFrom,
      recordCoverageText
    });
  };
  const getCodeCoverages = () => coverages;

  const startInterception = async () => {
    await page.setRequestInterception(true);
    page.on('request', interceptRequest);
    page.on('response', saveResponse);
  };
  const stopInterception = async () => {
    await page.removeAllListeners('request');
  };

  const startRecording = async () => {
    await page.tracing.start({ screenshots: true });
  };

  const stopRecording = async (screenshotFullPath) => {
    const buffer = await page.tracing.stop();
    const trace = JSON.parse(await String(buffer));
    const screenshotEvents = trace.traceEvents.filter((event) => event.name === 'Screenshot');

    return Promise.all(screenshotEvents.map((screenshotEvent, index) => {
      const imageBuffer = Buffer.from(screenshotEvent.args.snapshot, 'base64');
      const screenshotPath = `${screenshotFullPath}/${runningTestName.replace(/\//gu, '--')}-${index}.png`;

      return writeFileSafe(screenshotPath, imageBuffer);
    }));
  };

  return {
    getResponses,
    setTestName,
    startInterception,
    stopInterception,
    startCollectingCoverage,
    stopCollectingCoverage,
    getCodeCoverages,
    startRecording,
    stopRecording
  };
};

module.exports = factory;
