import React from 'react';
import { expect } from 'chai';
import ReactTestRenderer from 'react-test-renderer';
import '../src/chai';
import { Button, fadeIn } from './utils/framework';

describe('chai', () => {
  test('toHaveStyleRule', () => {
    const component = ReactTestRenderer.create(<Button />);
    expect(component).toHaveStyleRule('color', 'blue');
  });

  test('toNotHaveStyleRule', () => {
    const component = ReactTestRenderer.create(<Button />);
    expect(component).toNotHaveStyleRule('text-decoration');
  });

  test('toBeAGlobalStyle', () => {
    expect('body { font-family: \'Roboto\'; }').toBeAGlobalStyle();
  });

  it('toHaveComponent', () => {
    expect(Button).toHaveComponent('button');
  });

  it('toHaveKeyframeRule', () => {
    expect(fadeIn).toHaveKeyframeRule('0%', 'opacity', '0');
  });
});
