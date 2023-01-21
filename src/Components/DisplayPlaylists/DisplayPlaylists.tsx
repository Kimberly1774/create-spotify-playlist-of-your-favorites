import React, { useEffect, useState } from 'react';
import { Playlist as PlaylistType } from "spotify-types";
import { List } from 'antd';
import { getPlaylist, getPlaylists, getTrack } from '../../Functions';
import { CreatePlaylist, Playlist } from '..';
import { StyledDisplayPlaylist } from './StyledDisplayPlaylist';

interface DisplayPlaylistProps {
  token: string;
}

const DisplayPlaylists = ({ token }: DisplayPlaylistProps) => {
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

  useEffect(() => {
    updatePlaylistData();
  }, []);

  function updatePlaylistData() {
    getPlaylists(token).then((result) => setPlaylists(result));
  }

  return (
    <StyledDisplayPlaylist>
      <CreatePlaylist token={token} updatePlaylistData={updatePlaylistData} />
      {
        <List
          grid={{
            gutter: 36,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4,
          }}
          itemLayout="vertical"
          dataSource={playlists}
          renderItem={(playlist) => (
            <List.Item>
              <Playlist
                getTrack={getTrack}
                key={playlist.id}
                id={playlist.id}
                token={token}
                getPlaylist={getPlaylist}
              />
            </List.Item>
          )}
        />
      }
    </StyledDisplayPlaylist>
  );
}

export default DisplayPlaylists;