import React from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';
import { StyledSelect } from './StyledSelect';

export const Select = ({
  ...props
}: AntSelectProps) => {
  return (
    <StyledSelect>
      <AntSelect {...props} />
    </StyledSelect>
  );
};
