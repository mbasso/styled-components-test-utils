# styled-components-test-utils

[![Build Status](https://travis-ci.org/mbasso/styled-components-test-utils.svg?branch=master)](https://travis-ci.org/mbasso/styled-components-test-utils)
[![npm version](https://img.shields.io/npm/v/styled-components-test-utils.svg)](https://www.npmjs.com/package/styled-components-test-utils)
[![npm downloads](https://img.shields.io/npm/dm/styled-components-test-utils.svg?maxAge=2592000)](https://www.npmjs.com/package/styled-components-test-utils)
[![Coverage Status](https://coveralls.io/repos/github/mbasso/styled-components-test-utils/badge.svg?branch=master)](https://coveralls.io/github/mbasso/styled-components-test-utils?branch=master)

> Test utils for styled-components compatible with jest, expect, chai and jasmine

- - -

**:warning: Attention :warning: - if you want to use this library with styled-components v2 or v3, please install the 1.x.x version, defined in [this](https://github.com/mbasso/styled-components-test-utils/tree/v1) branch**

- - -


## Table of Contents

- [Motivation](#motivation)
- [Installation](#installation)
	- [Jest](#jest)
	- [Expect](#expect)
	- [Chai](#chai)
	- [Jasmine](#jasmine)
- [Api](#api)
	- [toHaveStyleRule](#tohavestylerule)
	- [toNotHaveStyleRule](#tonothavestylerule)
	- [toHaveKeyframeRule](#tohavekeyframerule)
	- [toBeAGlobalStyle](#tobeaglobalstyle)
	- [toMatchSnapshot](#tomatchsnapshot)
- [Change Log](#change-log)
- [Authors](#authors)
- [Copyright and License](#copyright-and-license)

## Motivation
This project is based on one simple idea: write a powerful set of test-utils for styled-components compatible with a lot assertion libraries.
This is born from the willing to use [jest-styled-components](https://github.com/styled-components/jest-styled-components) (a useful project on which this one is based) with [expect](https://github.com/mjackson/expect).

## Installation

You can install styled-components-test-utils using [npm](https://www.npmjs.com/package/styled-components-test-utils):

```bash
npm install --save-dev styled-components-test-utils
```

and if you haven't `react-test-renderer`:

```bash
npm install --save-dev react-test-renderer
```

and following one of these: [Jest](#jest), [Expect](#expect), [Chai](#chai), [Jasmine](#jasmine)

### Jest
To use styled-components-test-utils with jest, you simply have to import the following:

```js
import 'styled-components-test-utils/lib/jest';

// ...

expect(component).toHaveStyleRule(property, value);
```

### Expect
To use styled-components-test-utils with expect, you have to do the following:

```js
import expect from 'expect';
import injectStyledUtils from 'styled-components-test-utils/lib/expect';

injectStyledUtils(expect);

// ...

expect(component).toHaveStyleRule(property, value);
```

### Chai
To use styled-components-test-utils with chai, you simply have to import the following:

```js
import 'styled-components-test-utils/lib/chai';

// ...

expect(component).toHaveStyleRule(property, value);
```

### Jasmine
To use styled-components-test-utils with jasmine, you have to do the following:

```js
import injectStyledUtils from 'styled-components-test-utils/lib/jasmine';

describe('test', () => {
  beforeAll(() => {
    injectStyledUtils(jasmine);
  });

  // ...

  expect(component).toHaveStyleRule(property, value);

  // ...
});
```

## Api
Here is the list of the available APIs. Please, note that in the examples we are using `react-test-renderer` but this library works also with `react-test-renderer/shallow` and `enzyme's shallow`, `enzyme's mount` is not supported yet.

### toHaveStyleRule
> expect(tree).toHaveStyleRule(selector, value)
>
> expect({ component, modifier, media }).toHaveStyleRule(selector, value)
>
> expect({ css, props, modifier, media }).toHaveStyleRule(selector, value)

Asserts that `tree`, `component` or `css` has a rule `selector: value;`. You can also pass some additional parameters to test selectors and media queries, here is an example:

```js
const Button = styled.button`
  color: blue;

  &:hover {
    color: green;
  }

  @media screen and (max-width: 600px) {
    &:hover {
      color: yellow;
    }
  }
`;
const component = renderer.create(<Button />);
expect(component).toHaveStyleRule('color', 'blue');

expect({
  component,
  modifier: '&:hover', // works also with '> span' or 'html.test &' for example
}).toHaveStyleRule('color', 'green');

expect({
  component,
  modifier: '&:hover',
  media: 'screen and (max-width: 600px)', // search rule in the given media
}).toHaveStyleRule('color', 'yellow');

// you can also pass to media an object that should be thought of
// as if it is the current state of a device/browser.
// a type value must be specified, and it can not be "all".
// The returned rule is the one applied under those conditions
expect({
  component,
  modifier: '&:hover',
  media: {
    type: 'screen',
    width: '500px',
  },
}).toHaveStyleRule('color', 'yellow');

const style = css`
  color: ${props => props.primary ? props.theme.primary : 'white'}
`;

expect({
  css: style,
  props: {
    theme: {
      primary: 'purple',
    },
  },
}).toHaveStyleRule('color', 'purple');
```

### toNotHaveStyleRule
> expect(tree).toNotHaveStyleRule(selector)
>
> expect({ component, modifier, media }).toNotHaveStyleRule(selector)
>
> expect({ css, props, modifier, media }).toNotHaveStyleRule(selector)

Asserts that `tree`, `component` or `css` has no rule `selector: value;`. You can also pass some additional parameters to test selectors and media queries, as you can do with [toHaveStyleRule](#tohavestylerule), here is an example:

```js
const Button = styled.button`
  color: blue;
`;
const component = renderer.create(<Button />);
expect(component).toNotHaveStyleRule('background-color');
```

### toHaveKeyframeRule
> expect(keyframe).toHaveKeyframeRule(keyframeSelector, selector, value)

Asserts that `keyframe` has a rule `selector: value;` contained in `keyframeSelector`.

```js
import steps from './animationSteps';

const fadeIn = keyframes`
  ${steps.map(step => `
    ${step.perc}% {
      opacity: ${step.opacity};
    }
  `).join('')}
`;

expect(fadeIn).toHaveKeyframeRule('0%', 'opacity', '0');
expect(fadeIn).toHaveKeyframeRule('100%', 'opacity', '1');
```

### toBeAGlobalStyle
> expect(style).toBeAGlobalStyle(Component)

Asserts that `style` is a global style after mounting the given `Component`.

```js
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
    font-family: ${props => props.theme.fontFamily};
  }
`;

expect(`
  body {
    color: white;
    font-family: Helvetica Neue;
  }
`).toBeAGlobalStyle(() => (
  <ThemeProvider theme={{ fontFamily: 'Helvetica Neue' }}>
    <GlobalStyle whiteColor />
  </ThemeProvider>
));
```

### toMatchSnapshot
:warning: Jest only :warning:
> expect(tree).toMatchSnapshot()

This matcher is used to assert complex selectors or to test your entire component in one go.

```js
const tree = renderer.create(<MyComponent />).toJSON();
expect(tree).toMatchSnapshot();
```

If you want to use it with enzyme you also need to install [enzyme-to-json](https://www.npmjs.com/package/enzyme-to-json)

```bash
npm install --save-dev enzyme-to-json
```

and use it as follows

```js
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

test('with enzyme', () => {
  const wrapper = shallow(<MyComponent />);
  const tree = toJSON(wrapper);
  expect(tree).toMatchSnapshot();
})
```

or, you can enable it globally in your `package.json`:

```json
"jest": {
  "snapshotSerializers": [
    "enzyme-to-json/serializer"
  ]
}
```

and use it as follows

```js
import { shallow } from 'enzyme';

test('with enzyme', () => {
  const tree = shallow(<MyComponent />);
  expect(tree).toMatchSnapshot();
})
```

## Change Log

This project adheres to [Semantic Versioning](http://semver.org/).  
Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/mbasso/styled-components-test-utils/releases) page.

## Authors
**Matteo Basso**
- [github/mbasso](https://github.com/mbasso)
- [@teo_basso](https://twitter.com/teo_basso)

## Copyright and License
Copyright for portions of project styled-components-test-utils are held by Michele Bertoli, 2017 as part of project jest-styled-components. All other copyright for project styled-components-test-utils are held by Matteo Basso.

Copyright (c) 2017, Matteo Basso.

styled-components-test-utils source code is licensed under the [MIT License](https://github.com/mbasso/styled-components-test-utils/blob/master/LICENSE.md).
