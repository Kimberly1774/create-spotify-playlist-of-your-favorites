import React, { ReactNode } from 'react';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button
};

const Template = (args: { children: ReactNode }) => (
  <Button>{args.children}</Button>
);

const AllButtons = () => (
    <div style={{
      display: 'flex',
      gridGap: '20px',
      gridAutoFlow: 'column'
    }}>
      <Button type="primary">Primary..</Button>
      <Button type="default">Default</Button>
      <Button type="text">Text</Button>
    </div>
);

export const All = AllButtons.bind({});

export const Primary = Template.bind({});

export const Default = Template.bind({});

export const Text = Template.bind({});
