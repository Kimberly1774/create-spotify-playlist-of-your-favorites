import React from 'react';
import { Select } from './Select';

export default {
  title: 'Select',
  component: Select
};

const AllButtons = () => (
    <div style={{
      display: 'flex',
      gridGap: '20px',
      gridAutoFlow: 'column'
    }}>
      <Select size="small">Small..</Select>
      <Select>Default</Select>
      <Select size="large">Large</Select>
    </div>
);

export const All = AllButtons.bind({});
