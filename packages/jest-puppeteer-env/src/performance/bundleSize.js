const getBytes = require('bytes');

const checkBundleSize =
  ({ bundleSizes }) =>
  (response) => {
    let bundleSizeViolation;
    const headers = response.headers();
    const contentLength = Number(headers['content-length']);
    const contentType = String(headers['content-type']);
    const isJavaScript = contentType.includes('javascript');
    const isStylesheet = contentType.includes('css');
    const url = response.url();
    const matchingPatterns = bundleSizes.filter(({ path }) => new RegExp(path, 'u').test(url));

    if (matchingPatterns.length > 1) {
      throw new Error(`URL matches multiple bundle size paths: ${matchingPatterns.join(', ')}`);
    }

    const shouldCheckBundleSize = matchingPatterns.length && (isJavaScript || isStylesheet) && contentLength;

    if (shouldCheckBundleSize) {
      const maxBundleSize = matchingPatterns[0].maxSize;
      const bytes = getBytes(maxBundleSize);

      if (contentLength > bytes) {
        bundleSizeViolation = {
          rule: matchingPatterns[0],
          size: getBytes(contentLength),
          url
        };
      }
    }

    return bundleSizeViolation;
  };

module.exports = {
  checkBundleSize
};
