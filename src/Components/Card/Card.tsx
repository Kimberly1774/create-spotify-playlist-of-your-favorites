import React from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import { StyledCard } from './StyledCard';

export const Card = ({
  children,
  ...props
}: AntCardProps) => {
  return (
    <StyledCard>
      <AntCard {...props}>
        {children}
      </AntCard>
    </StyledCard>
  );
};
