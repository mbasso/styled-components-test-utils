import React from 'react';
import chalk from 'chalk';
import styled from 'styled-components';
import '../../src/jest';
import toHaveComponent from '../../src/matchers/toHaveComponent';

const Foo = () => <div><span>foo</span></div>;
const Bar = () => <div><span>bar</span></div>;

const Button = styled.button``;
const Link = styled.a``;
const StyledFoo = styled(Foo)``;

describe('toHaveComponent', () => {
  const getMessage = ({ received, expected }) =>
    `Expected styled-component to have component\n\t${chalk.green(expected)}\nreceived:\n\t${chalk.red(received)}`;

  test('should pass if tagnames are equal', () => {
    const result = toHaveComponent(Button, 'button');
    expect(result.message).toEqual(getMessage({
      received: 'button',
      expected: 'button',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should fail if tagnames are different', () => {
    const result = toHaveComponent(Link, 'button');
    expect(result.message).toEqual(getMessage({
      received: 'a',
      expected: 'button',
    }));
    expect(result.pass).toBeFalsy();
  });

  test('should pass if components are equal', () => {
    const result = toHaveComponent(StyledFoo, Foo);
    expect(result.message).toEqual(getMessage({
      received: 'Foo',
      expected: 'Foo',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should fail if components are different', () => {
    const result = toHaveComponent(StyledFoo, Bar);
    expect(result.message).toEqual(getMessage({
      received: 'Foo',
      expected: 'Bar',
    }));
    expect(result.pass).toBeFalsy();
  });

  test('should fail if component and tagname are different', () => {
    const result = toHaveComponent(StyledFoo, 'button');
    expect(result.message).toEqual(getMessage({
      received: 'Foo',
      expected: 'button',
    }));
    expect(result.pass).toBeFalsy();
  });

  test('should work with withComponent api', () => {
    const StyledButtonFoo = Button.withComponent(Foo);
    const result = toHaveComponent(StyledButtonFoo, Foo);
    expect(result.message).toEqual(getMessage({
      received: 'Foo',
      expected: 'Foo',
    }));
    expect(result.pass).toBeTruthy();
  });
});
