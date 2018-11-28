import chalk from 'chalk';
import toHaveStyleRule from './toHaveStyleRule';

const toNotHaveStyleRule = (received, selector) => {
  const { pass, message, value } = toHaveStyleRule(received, selector, '');

  return {
    pass: !pass && /^Property not found/.test(message),
    message: `Expected ${selector} to not exists but received:\n\t${chalk.red(value)}`,
  };
};

export default toNotHaveStyleRule;
