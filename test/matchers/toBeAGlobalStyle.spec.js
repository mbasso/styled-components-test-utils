import { injectGlobal } from 'styled-components';
import '../../src/jest';
import toBeAGlobalStyle from '../../src/matchers/toBeAGlobalStyle';

// eslint-disable-next-line
injectGlobal`
  body {
    font-family: 'Roboto';
  }
`;

describe('toBeAGlobalStyle', () => {
  const style = `
    body {
      font-family: 'Roboto';
    }
  `;

  const getMessage = value => `Expected global styles to contain: ${value}`;

  test('should pass', () => {
    const result = toBeAGlobalStyle(style);
    expect(result.message).toEqual(getMessage(style));
    expect(result.pass).toBeTruthy();
  });

  test('should skip whitespaces', () => {
    const received = `
      body    {
          font-family: 'Roboto';
        }
    `;
    const result = toBeAGlobalStyle(received);
    expect(result.message).toEqual(getMessage(received));
    expect(result.pass).toBeTruthy();
  });

  test('should fail', () => {
    const received = `
      body {
        font-family: ;
      }
    `;

    const result = toBeAGlobalStyle(received);
    expect(result.message).toEqual(getMessage(received));
    expect(result.pass).toBeFalsy();
  });
});
