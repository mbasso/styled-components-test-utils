import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;

const injectStyledUtils = require('../src/jasmine').default;
const { Button, fadeIn, GlobalStyle } = require('./utils/framework');

describe('jasmine', () => {
  beforeAll(() => {
    injectStyledUtils(jasmine);
  });

  it('toHaveStyleRule', () => {
    const component = ReactTestRenderer.create(<Button />);
    expect(component).toHaveStyleRule('color', 'blue');
  });

  it('toNotHaveStyleRule', () => {
    const component = ReactTestRenderer.create(<Button />);
    expect(component).toNotHaveStyleRule('text-decoration');
  });

  it('toBeAGlobalStyle', () => {
    expect('body { font-family: \'Roboto\'; }').toBeAGlobalStyle(GlobalStyle);
  });

  it('toHaveKeyframeRule', () => {
    expect(fadeIn).toHaveKeyframeRule('0%', 'opacity', '0');
  });
});
