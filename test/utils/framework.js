import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
    100% {
      opacity: 1;
    }
    0% {
      opacity: 0;
    }
  `;

// eslint-disable-next-line
export const Button = styled.button`
  color: blue;
  background-color: red;
`;
