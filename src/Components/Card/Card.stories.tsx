import React from 'react';
import { Card } from './Card';

export default {
  title: 'Card',
  component: Card
};

const Template = () => (
  <Card title="This is a card">This is content</Card>
);

export const FirstStory = Template.bind({});
