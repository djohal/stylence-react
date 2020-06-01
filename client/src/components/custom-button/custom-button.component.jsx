import React from 'react';
import styled from 'styled-components';

import './custom-button.styles.scss';

const Button = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
  <CustomButton
    className={`${inverted ? 'inverted' : ''} ${
      isGoogleSignIn ? 'google-sign-in' : ''
    } custom-button`}
    {...otherProps}
  >
    {children}
  </CustomButton>
);

const CustomButton = styled.button`
  &.inverted {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.body};
  }
`;

export default Button;
