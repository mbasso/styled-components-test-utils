import React from 'react';
import chalk from 'chalk';
import ReactTestRenderer from 'react-test-renderer';
import styled from 'styled-components';
import '../../src/jest';
import toHaveStyleRule from '../../src/matchers/toHaveStyleRule';

const Button = styled.button`
  color: blue;
  background-color: red;

  &:hover {
    color: white;
  }

  > span {
    color: green;
  }

  > span > span {
    color: red;
  }

  html.test & {
    color: black;
  }

  @media screen and (max-width: 600px) {
    &:hover {
      color: purple;
    }
  }
`;

describe('toNotHaveStyleRule', () => {
  const getMessage = ({
    selector,
    value,
  } = {}) =>
    `Expected ${selector} to not exists but received:\n\t${chalk.red(value)}`;

  test('should pass if property is not present', () => {
    const component = ReactTestRenderer.create(<Button />);
    const result = toHaveStyleRule(component, 'foo');
    expect(result.message).toEqual(getMessage({
      selector: 'foo',
      value: 'blue',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should fail if property is present', () => {
    const component = ReactTestRenderer.create(<Button />);
    const result = toHaveStyleRule(component, 'color');
    expect(result.message).toEqual(getMessage({
      selector: 'color',
      value: 'blue',
    }));
    expect(result.pass).toBeTruthy();
  });
});
