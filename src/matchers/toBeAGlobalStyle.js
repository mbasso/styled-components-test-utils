import chalk from 'chalk';
import getCSS from '../utils/getCSS';

const removeSpaces = string => string.replace(/\s+/g, '');

const toBeAGlobalStyle = (actual) => {
  const css = getCSS();

  return {
    message: `Expected global styles to contain:\n\t${chalk.red(actual)}`,
    pass: removeSpaces(css).indexOf(removeSpaces(actual)) !== -1,
  };
};

export default toBeAGlobalStyle;
