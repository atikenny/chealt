import path from 'path';
import glob from 'glob';
import fs from 'fs';
import { promisify } from 'util';

import logger from './logger.js';

const readFile = promisify(fs.readFile);

const globAsync = promisify(glob);

const getFolderAbsPath = (folder) => path.join(process.cwd(), folder);

const getMockFiles = ({ folder, extension }) => globAsync(`${folder}/**/*.${extension}`);

const getMocks = async ({ mocksFolderAbsPath, mockExtension }) => {
  logger.info(`Mocks are loaded from folder: ${mocksFolderAbsPath}`);

  const mockFiles = await getMockFiles({ folder: mocksFolderAbsPath, extension: mockExtension });

  if (!mockFiles?.length) {
    logger.error('There are no mock files in the specified folder!');
    process.exit(1); // eslint-disable-line no-process-exit
  }

  logger.info(`Found mock files: [${mockFiles.join(', ')}]`);

  return Promise.all(mockFiles.map((mockFilePath) => readFile(mockFilePath).then((buffer) => JSON.parse(buffer))));
};

const removePort = (url) => url.replace(/:\d\d\d\d[\d]*/gu, '');
const removeHost = (url) => url.replace(/https?:\/\/[^/]*/gu, '');

const isRegExp = (str) => str.startsWith('/') && str.endsWith('/');

const isMatchingUrl = ({ mockUrl, url, isPortAgnostic, isHostAgnostic }) => {
  if (isRegExp(mockUrl)) {
    const cleanMockUrl = mockUrl.slice(1, mockUrl.length - 1); // remove the beginning and ending forward slashes
    const exp = new RegExp(cleanMockUrl, 'u');

    return exp.test(url);
  }

  if (isPortAgnostic && isHostAgnostic) {
    return removeHost(removePort(mockUrl)) === removeHost(removePort(url));
  }

  if (isPortAgnostic) {
    return removePort(mockUrl) === removePort(url);
  }

  if (isHostAgnostic) {
    return removeHost(mockUrl) === removeHost(url);
  }

  return mockUrl === url;
};

const isMatchingHeaders = ({ mockHeaders, headers }) =>
  Object.keys(mockHeaders).every((key) => mockHeaders[key] === headers?.[key]);

const isMatchingRequest = ({ mock, url, headers, method, requestBody, isPortAgnostic, isHostAgnostic }) => {
  const matchingUrl = isMatchingUrl({ mockUrl: mock.url, url, isPortAgnostic, isHostAgnostic });
  const matchingMethod = mock.method === method;
  const matchingHeaders = !mock.requestHeaders || isMatchingHeaders({ mockHeaders: mock.requestHeaders, headers });
  const matchingBody = !requestBody || JSON.stringify(mock.requestBody) === JSON.stringify(requestBody);

  return matchingUrl && matchingMethod && matchingHeaders && matchingBody;
};

const findMocksForUrl =
  ({ isPortAgnostic, isHostAgnostic }) =>
  ({ mocks, url, headers, method, requestBody }) => {
    for (const [, urlMocks] of Object.entries(mocks)) {
      for (const mock of urlMocks) {
        const matchingMock = isMatchingRequest({
          mock,
          url,
          headers,
          method,
          requestBody,
          isPortAgnostic,
          isHostAgnostic
        });

        if (matchingMock) {
          return mock;
        }
      }
    }

    return undefined;
  };

export { getFolderAbsPath, getMocks, findMocksForUrl };
