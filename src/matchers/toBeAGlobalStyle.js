import React from 'react';
import chalk from 'chalk';
import TestRenderer from 'react-test-renderer';
import getCSS from '../utils/getCSS';

const removeSpaces = string => string.replace(/\s+/g, '');

const toBeAGlobalStyle = (actual, Component) => {
  const testRenderer = TestRenderer.create(<Component />);
  const css = getCSS();
  testRenderer.unmount();

  return {
    message: `Expected global styles to contain:\n\t${chalk.red(actual)}`,
    pass: removeSpaces(css).indexOf(removeSpaces(actual)) !== -1,
  };
};

export default toBeAGlobalStyle;
