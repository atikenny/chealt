const PuppeteerEnvironment = require('jest-environment-puppeteer');

const factory = require('./factory');
const { getLogger, logLevels } = require('./logger');
const { addTestResponses, setResponsesPath } = require('./state');
const { isTestStartEvent, isTestsEndEvent, getTestID } = require('./testEventUtils');
const { filterEmptyResponses, getMocks, getResponsesPath, hasResponses, validateConfig } = require('./envUtils');

const { DEBUG } = process.env;

class MockEnvironment extends PuppeteerEnvironment {
  constructor(config) {
    super(config);

    const { mockResponsePath, isPortAgnostic, rootDir, shouldUseMocks } = validateConfig(config);
    const responsesPath = getResponsesPath(rootDir, mockResponsePath);
    setResponsesPath(responsesPath);

    this.config = config;
    this.shouldUseMocks = shouldUseMocks;
    this.mocks = shouldUseMocks && getMocks(responsesPath);
    this.isPortAgnostic = isPortAgnostic;
  }

  async setup({
    logger = getLogger(DEBUG ? logLevels.debug : logLevels.default)
  } = {}) {
    await super.setup();
    // Your setup
    logger.debug(`Setting up environemnt with config: ${JSON.stringify(this.config, null, 4)}`);
    this.logger = logger;
    this.envInstance = await factory({
      page: this.global.page,
      mocks: this.mocks,
      logger,
      config: { isPortAgnostic: this.isPortAgnostic }
    });
  }

  async handleTestEvent(event) {
    if (isTestStartEvent(event)) {
      const testID = getTestID(event.test);
      this.envInstance.setTestName(testID);
    } else if (isTestsEndEvent(event)) {
      this.addTestResponses();
    }
  }

  addTestResponses() {
    const responses = this.envInstance.getResponses();
    const nonEmptyResponses = filterEmptyResponses(responses);

    if (!this.shouldUseMocks && hasResponses(nonEmptyResponses)) {
      addTestResponses(nonEmptyResponses);
    }
  }
}

module.exports = MockEnvironment;
