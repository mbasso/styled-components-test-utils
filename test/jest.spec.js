import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import '../src/jest';
import { Button, fadeIn } from './utils/framework';

describe('jest', () => {
  test('toHaveStyleRule', () => {
    const component = ReactTestRenderer.create(<Button />);
    expect(component).toHaveStyleRule('color', 'blue');
  });

  test('toBeAGlobalStyle', () => {
    expect('body { font-family: \'Roboto\'; }').toBeAGlobalStyle();
  });

  test('toHaveComponent', () => {
    expect(Button).toHaveComponent('button');
  });

  it('toHaveKeyframeRule', () => {
    expect(fadeIn).toHaveKeyframeRule('0%', 'opacity', '0');
  });
});
