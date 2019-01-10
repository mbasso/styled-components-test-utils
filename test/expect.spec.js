import React from 'react';
import expect from 'expect';
import ReactTestRenderer from 'react-test-renderer';
import injectStyledUtils from '../src/expect';
import { Button, fadeIn, GlobalStyle } from './utils/framework';

injectStyledUtils(expect);

describe('expect', () => {
  test('toHaveStyleRule', () => {
    const component = ReactTestRenderer.create(<Button />);
    expect(component).toHaveStyleRule('color', 'blue');
  });

  test('toNotHaveStyleRule', () => {
    const component = ReactTestRenderer.create(<Button />);
    expect(component).toNotHaveStyleRule('text-decoration');
  });

  test('toBeAGlobalStyle', () => {
    expect('body { font-family: \'Roboto\'; }').toBeAGlobalStyle(GlobalStyle);
  });

  it('toHaveKeyframeRule', () => {
    expect(fadeIn).toHaveKeyframeRule('0%', 'opacity', '0');
  });
});
