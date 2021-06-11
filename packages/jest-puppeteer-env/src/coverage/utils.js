const { bold, grey, inverse } = require('chalk');

const filterByUrl =
  (collectCoverageFrom) =>
  ({ url }) => {
    const shouldCollectCoverage = collectCoverageFrom.some((urlRegex) => new RegExp(urlRegex, 'u').test(url));

    return shouldCollectCoverage;
  };

const removeCoverageText = (coverage) => {
  const mappedCoverage = {
    ...coverage
  };

  delete mappedCoverage.text;

  return mappedCoverage;
};

const calculateCoverageDetails = (jsCoverage, cssCoverage) => {
  let totalBytes = 0;
  let usedBytes = 0;
  const coverage = [...jsCoverage, ...cssCoverage];

  for (const entry of coverage) {
    totalBytes += entry.text.length;

    for (const range of entry.ranges) {
      usedBytes += range.end - range.start - 1;
    }
  }

  const percentage = (usedBytes / totalBytes) * 100;

  return {
    usedBytes,
    totalBytes,
    percentage
  };
};

const printCoverages = ({ logger, coverages }) => {
  const prefix = inverse.bold(' COVERAGE ');
  Object.keys(coverages).forEach((testID) => {
    const { report } = coverages[testID];

    logger.info(
      `
  ${grey(testID)}:
    ${bold('Total:     ')} ${report.totalReport}
    ${bold('Unused:    ')} ${report.unusedReport}
    ${bold('Could save:')} ${report.timeSavings.GGGFormatted} (3G), ${report.timeSavings.GGFormatted} (2G)
    `,
      prefix
    );
  });
};

module.exports = {
  calculateCoverageDetails,
  filterByUrl,
  printCoverages,
  removeCoverageText
};
