import React, { useEffect } from 'react';
import { Track, Playlist as PlaylistType } from "spotify-types";
import { Avatar, List, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { addToPlaylist, clearPlaylist, getRecommendedTracks, getTopTracks } from '../../Functions';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { StyledPlaylist } from './StyledPlaylist';
const { Paragraph } = Typography;

interface PlaylistProps {
  id?: string;
  token: string;
  getTrack: (id: string, token: string) => Promise<Track[]>;
  getPlaylist: (id: string, token: string) => Promise<PlaylistType>;
}

export const Playlist = ({ id = "", token, getTrack, getPlaylist }: PlaylistProps) => {
  const [tracks, setTracks] = React.useState<Track[]>([]);
  const [playlist, setPlaylist] = React.useState<PlaylistType>();

  useEffect(() => {
    getTrack(id, token).then((data: Track[]) => setTracks(data));
    updatePlaylist();
  }, []);

  async function updatePlaylist() {
    getPlaylist(id, token).then((res: PlaylistType) => setPlaylist(res));
  }

  async function switchSongs() {
    if (playlist) {
      clearPlaylist(id, tracks, token);

      if (!playlist?.description) {
        getTopTracks(token, 5, 'medium_term').then((result) => {
          addToPlaylist(id, result, token).then(() => updatePlaylist());
          setTracks(result);
        })
        return;
      }

      const descri = playlist?.description;
      const genreSeed = JSON.parse(descri.replace(/&quot;/g, '"').replace(/&amp;/g, '&')).g;
      const length = JSON.parse(descri.replace(/&quot;/g, '"').replace(/&amp;/g, '&')).l;
      const trackSeed = JSON.parse(descri.replace(/&quot;/g, '"').replace(/&amp;/g, '&')).tS;
      const artistSeed = JSON.parse(descri.replace(/&quot;/g, '"').replace(/&amp;/g, '&')).a;
      const timeRange = JSON.parse(descri.replace(/&quot;/g, '"').replace(/&amp;/g, '&')).t;

      if (genreSeed === 'top') {
        getTopTracks(token, length, timeRange).then((result) => {
          addToPlaylist(id, result, token).then(() => updatePlaylist());
          setTracks(result);
        })
        return;
      }

      getRecommendedTracks(token, genreSeed, length, artistSeed, trackSeed).then((result) => {
        addToPlaylist(id, result, token).then(() => updatePlaylist());
        setTracks(result);
        return result;
      });
    }
  }

  async function addSongs() {
    console.log('TO DO: make sure function isnt needed or adjust to description')
    getTopTracks(token, 5, 'medium_term').then((result) => {
      addToPlaylist(id, result, token).then(() => updatePlaylist());
      setTracks(result);
    })
  }

  if (!playlist) {
    return (
      <Card style={{ width: 400 }} loading={true}>
        <Meta
          title="Loading"
        />
      </Card>
    )
  }

  return (
    <StyledPlaylist>
      <Card>
        <Meta
          title={playlist?.name || 'Playlist Title'}
          avatar={<Avatar
            size={64}
            alt={playlist?.name || ''}
            src={playlist?.images?.[0]?.url}
            shape="square"
          />}
        />
        <List
          itemLayout="vertical"
          dataSource={tracks}
          renderItem={(track) => (
            <List.Item key={track.id}>
              <div
                style={{
                  alignItems: 'center',
                  columnGap: '12px',
                  overflow: 'hidden',
                  display: 'grid',
                  gridAutoFlow: 'column',
                  gridTemplateColumns: 'auto 1fr'
                }}>
                <Avatar
                  src={track.album.images[0].url}
                  size={42}
                  shape="square"
                />
                <div>
                  <Paragraph strong ellipsis={true} style={{ margin: 0 }}>{track?.name}</Paragraph>
                  <Paragraph ellipsis={true} style={{ margin: 0 }}>{track?.artists[0].name}</Paragraph>
                </div>
              </div>
            </List.Item>
          )}>
        </List>
        {tracks?.length === 0
          ? <Button onClick={addSongs}>Add Songs</Button>
          : <Button type="default" onClick={switchSongs}>Switch Songs</Button>}
      </Card>
    </StyledPlaylist>
  );
};
