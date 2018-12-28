import React from 'react';
import chalk from 'chalk';
import ReactTestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import styled, { css } from 'styled-components';
import { shallow /* , mount */ } from 'enzyme';
import '../../src/jest';
import toHaveStyleRule from '../../src/matchers/toHaveStyleRule';

const Button = styled.button`
  color: blue;
  background-color: red;

  &:hover {
    color: white;
  }

  *:not([fill='none']) {
    color: black;
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

const ButtonWithSpaces = styled.button`
    color  :   blue  ;
`;

describe('toHaveStyleRule', () => {
  const getMessage = ({
    expected,
    selector,
    received,
  } = {}) =>
    `Expected ${selector} matching\n\t${chalk.green(expected)}\nreceived:\n\t${chalk.red(received)}`;

  test('should pass if properties are equal', () => {
    const component = ReactTestRenderer.create(<Button />);
    const result = toHaveStyleRule(component, 'color', 'blue');
    expect(result.message).toEqual(getMessage({
      expected: 'blue',
      received: 'blue',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should fail if properties are different', () => {
    const component = ReactTestRenderer.create(<Button />);
    const result = toHaveStyleRule(component, 'color', 'red');
    expect(result.message).toEqual(getMessage({
      expected: 'red',
      received: 'blue',
      selector: 'color',
    }));
    expect(result.pass).toBeFalsy();
  });

  test('should fail if property is not present', () => {
    const component = ReactTestRenderer.create(<Button />);
    const result = toHaveStyleRule(component, 'foo', 'red');
    expect(result.message).toEqual(`Property not found: ${chalk.red('foo')}`);
    expect(result.pass).toBeFalsy();
  });

  test('should not match properties with prefix', () => {
    // should not match backgrund-color: red;
    const component = ReactTestRenderer.create(<Button />);
    const result = toHaveStyleRule(component, 'color', 'red');
    expect(result.message).toEqual(getMessage({
      received: 'blue',
      selector: 'color',
      expected: 'red',
    }));
    expect(result.pass).toBeFalsy();
  });

  test('should skip whitespaces', () => {
    const component = ReactTestRenderer.create(<ButtonWithSpaces />);
    const result = toHaveStyleRule(component, 'color', 'blue');
    expect(result.message).toEqual(getMessage({
      expected: 'blue',
      received: 'blue',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should support pseudo selectors', () => {
    let component = ReactTestRenderer.create(<Button />);
    let result = toHaveStyleRule({
      component,
      modifier: '&:hover',
    }, 'color', 'white');
    expect(result.message).toEqual(getMessage({
      expected: 'white',
      received: 'white',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();

    component = ReactTestRenderer.create(<Button />);
    result = toHaveStyleRule({
      component,
      modifier: '*:not([fill=\'none\'])',
    }, 'color', 'black');
    expect(result.message).toEqual(getMessage({
      expected: 'black',
      received: 'black',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();

    component = ReactTestRenderer.create(<Button />);
    result = toHaveStyleRule({
      component,
      modifier: '&:hover',
    }, 'color', 'blue');
    expect(result.message).toEqual(getMessage({
      expected: 'blue',
      received: 'white',
      selector: 'color',
    }));
    expect(result.pass).toBeFalsy();
  });

  test('should support descendant selectors', () => {
    let component = ReactTestRenderer.create(<Button />);
    let result = toHaveStyleRule({
      component,
      modifier: '> span',
    }, 'color', 'green');
    expect(result.message).toEqual(getMessage({
      expected: 'green',
      received: 'green',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();

    component = ReactTestRenderer.create(<Button />);
    result = toHaveStyleRule({
      component,
      modifier: '> span > span',
    }, 'color', 'red');
    expect(result.message).toEqual(getMessage({
      expected: 'red',
      received: 'red',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should support contextual selectors', () => {
    const component = ReactTestRenderer.create(<Button />);
    const result = toHaveStyleRule({
      component,
      modifier: 'html.test &',
    }, 'color', 'black');
    expect(result.message).toEqual(getMessage({
      expected: 'black',
      received: 'black',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should work with react-test-renderer', () => {
    const component = ReactTestRenderer.create(<Button />);
    const result = toHaveStyleRule(component, 'color', 'blue');
    expect(result.message).toEqual(getMessage({
      expected: 'blue',
      received: 'blue',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should work with react-test-renderer/shallow', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<Button />);
    const component = renderer.getRenderOutput();
    const result = toHaveStyleRule(component, 'color', 'blue');
    expect(result.message).toEqual(getMessage({
      expected: 'blue',
      received: 'blue',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should work with enzyme shallow rendering', () => {
    const component = shallow(<Button />);
    const result = toHaveStyleRule(component, 'color', 'blue');
    expect(result.message).toEqual(getMessage({
      expected: 'blue',
      received: 'blue',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  });

  // not supported yet
  /* test('should work with enzyme mount', () => {
    const component = mount(<Button />);
    const result = toHaveStyleRule(component, 'color', 'blue');
    expect(result.message).toEqual(getMessage({
      expected: 'blue',
      received: 'blue',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  }); */

  test('should work with extend api', () => {
    const ExtendedButton = Button.extend`
      color: green;
    `;
    const component = ReactTestRenderer.create(<ExtendedButton />);
    const result = toHaveStyleRule(component, 'color', 'green');
    expect(result.message).toEqual(getMessage({
      expected: 'green',
      received: 'green',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should support regexp', () => {
    const component = ReactTestRenderer.create(<Button />);
    const result = toHaveStyleRule(component, 'color', /blue/);
    expect(result.message).toEqual(getMessage({
      expected: '/blue/',
      received: 'blue',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should work with css api', () => {
    /* eslint-disable */
    const mixin = css`
      color: ${props => props.whiteColor ? 'white': 'black'}
    `;
    /* eslint-enable */
    let result = toHaveStyleRule({
      css: mixin,
      props: {
        whiteColor: true,
      },
    }, 'color', 'white');
    expect(result.message).toEqual(getMessage({
      expected: 'white',
      received: 'white',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();

    result = toHaveStyleRule({
      css: mixin,
      props: {
        whiteColor: true,
      },
    }, 'color', 'blue');
    expect(result.message).toEqual(getMessage({
      expected: 'blue',
      received: 'white',
      selector: 'color',
    }));
    expect(result.pass).toBeFalsy();
  });

  test('should support string @media', () => {
    const component = ReactTestRenderer.create(<Button />);
    const result = toHaveStyleRule({
      component,
      modifier: '&:hover',
      media: 'screen and (max-width: 600px)',
    }, 'color', 'purple');
    expect(result.message).toEqual(getMessage({
      expected: 'purple',
      received: 'purple',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();
  });

  test('should support matching @media', () => {
    const media = {
      type: 'screen',
      width: '500px',
    };
    const component = ReactTestRenderer.create(<Button />);
    let result = toHaveStyleRule({
      component,
      modifier: '&:hover',
      media,
    }, 'color', 'purple');
    expect(result.message).toEqual(getMessage({
      expected: 'purple',
      received: 'purple',
      selector: 'color',
    }));
    expect(result.pass).toBeTruthy();

    result = toHaveStyleRule({
      component,
      media,
    }, 'background-color', 'red');
    expect(result.message).toEqual(getMessage({
      expected: 'red',
      received: 'red',
      selector: 'background-color',
    }));
    expect(result.pass).toBeTruthy();

    result = toHaveStyleRule({
      component,
      modifier: '&:hover',
      media: {
        type: 'screen',
        width: '700px',
      },
    }, 'color', 'purple');
    expect(result.message).toEqual(getMessage({
      expected: 'purple',
      received: 'white',
      selector: 'color',
    }));
    expect(result.pass).toBeFalsy();

    result = toHaveStyleRule({
      component,
      modifier: '&:hover',
      media: {
        width: '500px',
      },
    }, 'color', 'purple');
    expect(result.message).toEqual(getMessage({
      expected: 'purple',
      received: 'white',
      selector: 'color',
    }));
    expect(result.pass).toBeFalsy();
  });
});
