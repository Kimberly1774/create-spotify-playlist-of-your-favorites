import React from 'react';
import CreatePlaylist from './CreatePlaylist';

export default {
  title: 'CreatePlaylist',
  component: CreatePlaylist,
};

const Template = () => (
  <CreatePlaylist token="" updatePlaylistData={() => console.log("update playlist")} />
);

export const FirstStory = Template.bind({});
