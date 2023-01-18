import React from 'react';
import { ConfigProvider } from 'antd';
import theme from '../../theme';
import { Playlist } from './Playlist';
import { getTrackDataMock, getPlaylistDataMock } from './Playlist.mock';

export default {
  title: 'Playlist',
  component: Playlist,
};

const Template = () => {
  return (
    <ConfigProvider
      theme={{
        ...theme,
      }}
    >
    <Playlist
      getTrack={getTrackDataMock}
      getPlaylist={getPlaylistDataMock}
      token=""
    />
  </ConfigProvider>
)};

export const FirstStory = Template.bind({});
