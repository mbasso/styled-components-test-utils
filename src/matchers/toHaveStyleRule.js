/* eslint-disable one-var, no-useless-escape, no-underscore-dangle */

import React from 'react';
import chalk from 'chalk';
import ReactTestRenderer from 'react-test-renderer';
import styled from 'styled-components';
import mediaQuery from 'css-mediaquery';
import getCSS from '../utils/getCSS';
import getCodeBlock from '../utils/getCodeBlock';

const findClassName = (received) => {
  let className = '';

  const component = received.component || received;

  if (typeof component.props === 'function') {
    // enzyme 3
    className = component.props().className;
  } else if (component.props && (component.props.class || component.props.className)) {
    // react-test-renderer/shallow
    className = component.props.class || component.props.className;
  } else if (!component.node && component.constructor && typeof component.toJSON === 'function') {
    // react-test-renderer
    className = component.toJSON().props.className;
  } else if (component.node) {
    // enzyme 2
    if (component.node.className) {
      className = component.node.className;
    } else if (component.node.props) {
      // enzyme's shallow
      className = component.node.props.className;
    } else {
      // enzyme's mount
      const rendered = component.node._reactInternalInstance._renderedComponent;

      className = rendered._instance && rendered._instance.state
        ? rendered._instance.state.generatedClassName
        : rendered._currentElement.props.className;
    }
  }

  if (!className) {
    className = '';
  }
  // styled components adds the className on the end.
  className = className.split(/\s+/).pop();

  if (received.modifier) {
    const modifier = received.modifier.trim();
    if (modifier.indexOf('>') === 0) {
      // descendant selector
      className += ` ${modifier}`;
    } else {
      // pseudo or contextual selector
      className = received.modifier.trim().replace('&', `.${className}`);
    }
  }
  return className;
};

const getCodeInMedia = (code, media) => {
  const newMedia = media.replace('(', '\\(')
    .replace(')', '\\)')
    .replace(/\s/g, '\\s*');
  const mediaMatches = new RegExp(`@media\\s*${newMedia}\\s*{(.*)`).exec(code);
  const trailingCode = mediaMatches && mediaMatches[0];
  if (!trailingCode) return '';

  return getCodeBlock(trailingCode);
};

const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const getStyleRule = (code, className, selector) => {
  const styles = new RegExp(`${escapeRegExp(className)}\\s*{([^}]*)`, 'g').exec(code);
  const capture = new RegExp(`(?:[^\\-]|^)${selector}\\s*:\\s*([^;]+)`, 'g');

  const matches = styles && styles[1].match(capture);
  if (!matches) return '';

  const values = matches.map(r => r.replace(capture, '$1').trim());
  const val = values && values[0] && values[values.length - 1];

  return val || '';
};

const toHaveStyleRule = (received, selector, expected) => {
  let className;

  if (received.css && received.props) {
    const Temp = styled.span`${received.css}`;
    const component = ReactTestRenderer.create(<Temp {...received.props} />);
    className = findClassName({
      ...received,
      component,
    });
  } else {
    className = findClassName(received);
  }

  const css = getCSS();

  const getMessage = value => `Expected ${selector} matching\n\t${chalk.green(expected)}\nreceived:\n\t${chalk.red(value)}`;

  const error = {
    pass: false,
    message: `Property not found: ${chalk.red(selector)}`,
  };

  let code = css;
  let val = '';
  const { media } = received;

  if (!media) {
    val = getStyleRule(code, className, selector);
  } else if (typeof media === 'string') {
    code = getCodeInMedia(code, media);

    if (code === '') return error;
    val = getStyleRule(code, className, selector);
  } else if (typeof media === 'object') {
    const mediaRegExp = new RegExp('@media([^{]*)?{', 'g');
    const medias = [];
    let match;
    // eslint-disable-next-line
    while ((match = mediaRegExp.exec(code)) !== null) {
      medias.push(match[1].trim());
    }

    let values = medias.filter(x => mediaQuery.match(x, media))
      .map(x => getCodeInMedia(code, x))
      .map(x => getStyleRule(x, className, selector));

    const mediaMatches = values.length;
    const classMatches = code.match(new RegExp(className, 'g'));

    if (mediaMatches < classMatches.length - 1) {
      // has a rule outside media (first match)
      values.unshift(getStyleRule(code, className, selector));
    }

    values = values.filter(x => x !== '');

    if (values.length > 0) {
      val = values[values.length - 1];
    }
  }

  if (val === '') return error;

  return {
    message: getMessage(val),
    pass: expected instanceof RegExp ? val.match(expected) : val === expected,
    value: val,
  };
};

export default toHaveStyleRule;
