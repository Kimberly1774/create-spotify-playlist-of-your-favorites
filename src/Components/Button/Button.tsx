import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import { StyledButton } from './StyledButton';

export const Button = ({
  children,
  type = 'primary',
  ...props
}: AntButtonProps) => {
  return (
    <StyledButton>
      <AntButton type={type} {...props}>
        {children}
      </AntButton>
    </StyledButton>
  );
};
