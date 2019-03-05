import chalk from 'chalk';
import '../../src/jest';
import { GlobalStyle } from '../utils/framework';
import toBeAGlobalStyle from '../../src/matchers/toBeAGlobalStyle';

describe('toBeAGlobalStyle', () => {
  const style = `
    body {
      font-family: 'Roboto';
    }
  `;

  const getMessage = value => `Expected global styles to contain:\n\t${chalk.red(value)}`;

  test('should pass', () => {
    const result = toBeAGlobalStyle(style, GlobalStyle);
    expect(result.message).toEqual(getMessage(style));
    expect(result.pass).toBeTruthy();
  });

  test('should skip whitespaces', () => {
    const received = `
      body    {
          font-family: 'Roboto';
        }
    `;
    const result = toBeAGlobalStyle(received, GlobalStyle);
    expect(result.message).toEqual(getMessage(received));
    expect(result.pass).toBeTruthy();
  });

  test('should fail', () => {
    const received = `
      body {
        font-family: ;
      }
    `;

    const result = toBeAGlobalStyle(received, GlobalStyle);
    expect(result.message).toEqual(getMessage(received));
    expect(result.pass).toBeFalsy();
  });
});
