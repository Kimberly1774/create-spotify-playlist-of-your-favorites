import React from 'react';
import { SelectTagMode } from './SelectTagMode';

export default {
  title: 'SelectTagMode',
  component: SelectTagMode
};

const Template = () => (
  <SelectTagMode
    options={[{ value: 'indie', label: 'Indie' }, { value: 'pop', label: 'Pop' }, { value: 'rock', label: 'Rock' }]}
    handleChange={() => console.log('select tag')}
  />
);

export const FirstStory = Template.bind({});
