import React from 'react';
import CreatePlaylist from './CreatePlaylist';

export default {
  title: 'CreatePlaylist',
  component: CreatePlaylist,
};

function updatePlaylistData() {
  console.log('update');
}

const Template = () => (
  <CreatePlaylist token="" updatePlaylistData={updatePlaylistData} />
);

export const FirstStory = Template.bind({});
