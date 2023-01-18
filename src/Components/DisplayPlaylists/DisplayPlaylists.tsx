import React, { useEffect, useState } from 'react';
import { Playlist as PlaylistType } from "spotify-types";
import { List } from 'antd';
import { getPlaylist, getTrack } from '../../Functions';
import { CreatePlaylist, Playlist } from '..';
import { StyledDisplayPlaylist } from './StyledDisplayPlaylist';

interface DisplayPlaylistProps {
  token: string;
}

const DisplayPlaylists = ({ token }: DisplayPlaylistProps) => {
  const [playlists, setPlaylists] = useState<PlaylistType[]>([]);

  useEffect(() => {
    getPlaylists();
  }, []);

  const getPlaylists = () => {
    fetch('https://api.spotify.com/v1/users/1131858986/playlists?limit=15&offset=0', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredPlaylists = data.items?.filter((play: PlaylistType) => play.name.includes('My Faves'));
        setPlaylists(filteredPlaylists);
      })
  };

  return (
    <StyledDisplayPlaylist>
      <CreatePlaylist token={token} updatePlaylistData={() => getPlaylists()} />
      {
        <List
          grid={{
            gutter: 8,
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