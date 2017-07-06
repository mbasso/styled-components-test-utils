import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

const getFunctionName = (fun) => {
  let ret = fun.toString();
  ret = ret.substr('function '.length);
  ret = ret.substr(0, ret.indexOf('('));
  return ret;
};

const getComponentName = (component) => {
  let name = component;
  if (typeof component !== 'string') {
    name = getFunctionName(component);
  }
  return name;
};

export default (Component, expected) => {
  const renderer = new ShallowRenderer();
  renderer.render(<Component />);
  const component = renderer.getRenderOutput().type;

  return {
    pass: component === expected,
    message: `Expected styled-component to have component ${getComponentName(expected)} received: ${getComponentName(component)}`,
  };
};
