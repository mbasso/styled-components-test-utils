import { keyframes } from 'styled-components';
import chalk from 'chalk';
import '../../src/jest';
import toHaveKeyframeRule from '../../src/matchers/toHaveKeyframeRule';

describe('toHaveKeyframeRule', () => {
  const fadeIn = keyframes`
    100% {
      opacity: 1;
    }
    0% {
      opacity: 0;
    }
  `;

  const getMessage = ({
    keyframeSelector,
    selector,
    expected,
    received,
  }) =>
    `Expected keyframe to have ${keyframeSelector} ${selector} matching\n\t${chalk.green(expected)}\nreceived:\n\t${chalk.red(received)}`;

  test('should pass if properties are equal', () => {
    const result = toHaveKeyframeRule(fadeIn, '0%', 'opacity', '0');
    expect(result.message).toEqual(getMessage({
      keyframeSelector: '0%',
      selector: 'opacity',
      expected: '0',
      received: '0',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should pass if properties are not equal', () => {
    const result = toHaveKeyframeRule(fadeIn, '0%', 'opacity', '1');
    expect(result.message).toEqual(getMessage({
      keyframeSelector: '0%',
      selector: 'opacity',
      expected: '1',
      received: '0',
    }));
    expect(result.pass).toBeFalsy();
  });

  test('should fail if property is not present', () => {
    const result = toHaveKeyframeRule(fadeIn, '0%', 'foo', '0');
    expect(result.message).toEqual(`Property not found: ${chalk.red('0%')} ${chalk.red('foo')}`);
    expect(result.pass).toBeFalsy();
  });

  test('should fail if keyframeSelector is not present', () => {
    const result = toHaveKeyframeRule(fadeIn, '75%', 'top', '0');
    expect(result.message).toEqual(`Property not found: ${chalk.red('75%')} ${chalk.red('top')}`);
    expect(result.pass).toBeFalsy();
  });

  test('should fail if keyframed doesn\'t exist', () => {
    const result = toHaveKeyframeRule({ getName: () => 'foo' }, '75%', 'top', '0');
    expect(result.message).toEqual(`Property not found: ${chalk.red('75%')} ${chalk.red('top')}`);
    expect(result.pass).toBeFalsy();
  });

  test('should support regexp', () => {
    const result = toHaveKeyframeRule(fadeIn, '0%', 'opacity', /0/);
    expect(result.message).toEqual(getMessage({
      keyframeSelector: '0%',
      selector: 'opacity',
      expected: '/0/',
      received: '0',
    }));
    expect(result.pass).toBeTruthy();
  });
});
