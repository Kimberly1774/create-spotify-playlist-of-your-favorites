import React from 'react';
import { SelectTagMode } from './SelectTagMode';

export default {
  title: 'SelectTagMode',
  component: SelectTagMode
};

function handleChange() {
  console.log('select tag')
}

const Template = () => (
  <SelectTagMode
    options={[{ value: 'indie', label: 'Indie' }, { value: 'pop', label: 'Pop' }, { value: 'rock', label: 'Rock' }]}
    handleChange={handleChange}
  />
);

export const FirstStory = Template.bind({});
