// @flow

import React from 'react';
import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { render } from 'react-testing-library';
import styled, { ThemeProvider } from 'styled-components';
import { shallow, mount } from 'enzyme';
import '../../src/jest';

type LinkProps = {
  className: string,
  children: any,
};

const Fragment = ({ children }) => children;

const toMatchSnapshot = (name, component) => {
  expect(renderer.create(component).toJSON()).toMatchSnapshot(`${name} - react-test-renderer`);
  expect(render(component).container.firstChild).toMatchSnapshot(`${name} - react-testing-library`);

  if (component !== null) {
    expect(mount(component)).toMatchSnapshot(`${name} - mount`);
    expect(shallow(component)).toMatchSnapshot(`${name} - shallow`);

    if (typeof component.type !== 'string') {
      const shallowRenderer = new ShallowRenderer();
      shallowRenderer.render(component);
      expect(shallowRenderer.getRenderOutput()).toMatchSnapshot(`${name} - react-test-renderer shallow`);
    }
  }
};

describe('toMatchSnapshot', () => {
  test('null', () => {
    toMatchSnapshot('null', null);
  });

  test('non-styled', () => {
    toMatchSnapshot('non-styled', <div />);
  });

  test('empty style', () => {
    const Component = styled.div``;

    toMatchSnapshot('empty style', <Component />);
  });

  test('basic', () => {
    const Wrapper = styled.section`
      padding: 4em;
      background: papayawhip;
    `;

    const Title = styled.h1`
      font-size: 1.5em;
      text-align: center;
      color: palevioletred;
    `;

    toMatchSnapshot(
      'basic',
      <Wrapper>
        <Title>Hello World, this is my first styled component!</Title>
      </Wrapper>,
    );
  });

  test('any component', () => {
    const Link = ({ className, children }: LinkProps) => (
      <a className={className}>
        {children}
      </a>
    );

    const StyledLink = styled(Link)`
      color: palevioletred;
      font-weight: bold;
    `;

    toMatchSnapshot(
      'any component',
      <Fragment>
        <Link>Unstyled, boring Link</Link>
        <br />
        <StyledLink>Styled, exciting Link</StyledLink>
      </Fragment>,
    );
  });

  test('extending styles', () => {
    const Button = styled.button`
      color: palevioletred;
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid palevioletred;
      border-radius: 3px;
    `;

    const TomatoButton = styled(Button)`
      color: tomato;
      border-color: tomato;
    `;

    toMatchSnapshot(
      'extending styles',
      <Fragment>
        <Button>Normal Button</Button>
        <TomatoButton>Tomato Button</TomatoButton>
      </Fragment>,
    );
  });

  test('attaching additional props', () => {
    const Div = styled.div.attrs({
      className: 'div',
    })`
      color: red;
    `;

    toMatchSnapshot('attaching additional props', <Div />);
  });

  test('theming', () => {
    const Button = styled.button`
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border-radius: 3px;
      color: ${props => props.theme.main};
      border: 2px solid ${props => props.theme.main};
    `;

    Button.defaultProps = {
      theme: {
        main: 'palevioletred',
      },
    };

    const theme = {
      main: 'mediumseagreen',
    };

    toMatchSnapshot(
      'theming',
      <Fragment>
        <Button>Normal</Button>
        <ThemeProvider theme={theme}>
          <Button>Themed</Button>
        </ThemeProvider>
      </Fragment>,
    );
  });

  test('supported css', () => {
    const Example = styled.div`
      padding: 2em 1em;
      background: papayawhip;
      &:hover {
        background: palevioletred;
      }
      @media (max-width: 600px) {
        background: tomato;
        &:hover {
          background: yellow;
        }
      }
      > p {
        text-decoration: underline;
      }
      html.test & {
        display: none;
      }
    `;

    toMatchSnapshot(
      'supported css',
      <Example>
        <p>Hello World!</p>
      </Example>,
    );
  });

  test('referring to other components', () => {
    const Link = styled.a`
      display: flex;
      align-items: center;
      padding: 5px 10px;
      background: papayawhip;
      color: palevioletred;
    `;

    const Icon = styled.svg`
      transition: fill 0.25s;
      width: 48px;
      height: 48px;
      ${Link}:hover & {
        fill: rebeccapurple;
      }
    `;

    const Label = styled.span`
      display: flex;
      align-items: center;
      line-height: 1.2;
      &::before {
        content: '◀';
        margin: 0 10px;
      }
    `;

    toMatchSnapshot(
      'referring to other components',
      <Link href="#">
        <Icon />
        <Label>Hovering my parent changes my style!</Label>
      </Link>,
    );
  });
});
