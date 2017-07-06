import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import styled from 'styled-components';
import { shallow, mount } from 'enzyme';
import '../../src/jest';

const Button = styled.section`
  padding: 4em;
  background: papayawhip;
`;

describe('toMatchStyledComponentsSnapshot', () => {
  test('null', () => {
    expect(null).toMatchStyledComponentsSnapshot();
  });

  test('should work with react-test-renderer', () => {
    const tree = ReactTestRenderer.create(
      <Button>Click here</Button>,
    ).toJSON();
    expect(tree).toMatchStyledComponentsSnapshot();
  });

  test('should work with enzyme shallow rendering', () => {
    const tree = shallow(<Button>Click here</Button>);
    expect(tree).toMatchStyledComponentsSnapshot();
  });

  test('should work with enzyme mount', () => {
    const tree = mount(<Button>Click here</Button>);
    expect(tree).toMatchStyledComponentsSnapshot();
  });
});
