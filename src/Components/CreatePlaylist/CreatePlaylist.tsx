import { InputNumber, Row, Col, Typography } from "antd";
import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { getRecommendedTracks, createNewPlaylist, addToPlaylist, getYourTracks } from '../../Functions';
import { getYourTopArtists } from "../../Functions/getYourTopArtists";
import { getTopTracks } from "../../Functions/getTopTracks";
import { getYourGenres } from "../../Functions/getYourGenres";
import { Button } from "../Button/Button";
import { SelectOptionType, SelectTagMode } from "../SelectTagMode/SelectTagMode";
import { Select } from "../Select/Select";
import { StyledCreatePlaylist } from "./StyledCreatePlaylist";
import { options } from "./timeRangeOptions";

interface CreatePlaylistProps {
  token: string;
  updatePlaylistData: () => void;
}

const Wrapper = styled.div`
  height: fit-content;
  display: flex;
  flex-direction: column;
  background: #fafafa;
  gap: ${props => props.theme.spacing.m};
  justify-content: center;
  padding: ${props => props.theme.spacing.m};
  ${props => props.theme.shadow.light};
`;

const CreatePlaylist = ({ token, updatePlaylistData }: CreatePlaylistProps) => {
  const [newPlaylistLength, setNewPlaylistsLength] = useState<number>(5);
  const [newCustomPlaylistLength, setNewCustomPlaylistsLength] = useState<number>(5);
  const [yourGenres, setYourGenres] = useState<SelectOptionType[]>();
  const [yourTracks, setYourTracks] = useState<SelectOptionType[]>();
  const [artists, setArtists] = useState<SelectOptionType[]>();
  const [selectedTrack, setSelectedTrack] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedYourGenre, setSelectedYourGenre] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<string>('medium_term');
  const [customTimeRange, setCustomTimeRange] = useState<string>('medium_term');

  function returnValuesNItems(arr: SelectOptionType[], count = 1) {
    const shortArr = arr.splice(0, count);
    return shortArr.map(gen => gen.value);
  }

  async function getAndSetSeeds() {
    await getYourGenres(token, customTimeRange).then((genres) => {
      setYourGenres(genres);
      setSelectedYourGenre(returnValuesNItems(genres));
    });
    await getYourTopArtists(token, customTimeRange).then((artists) => {
      setArtists(artists);
      setSelectedArtists(artists?.map((artist: SelectOptionType) => artist.value).slice(0, 2));
    });
    await getYourTracks(token, customTimeRange).then((tracks) => {
      setYourTracks(tracks);
      setSelectedTrack(tracks?.map((track: SelectOptionType) => track.value).slice(0, 2));
    });
  }

  useMemo(() => {
    getAndSetSeeds();
  }, [customTimeRange]);

  async function createNewCustomizedPlaylist() {
    const artistSeed = selectedArtists.join('&') || '';
    const trackSeed = selectedTrack.join('&') || '';
    const genreSeed = selectedYourGenre.join('&') || '';

    createNewPlaylist(token, newCustomPlaylistLength, customTimeRange, genreSeed, artistSeed, trackSeed).then(playlistId => {
      getRecommendedTracks(token, genreSeed, newCustomPlaylistLength, artistSeed, trackSeed).then((tracks) => {
        addToPlaylist(playlistId, tracks, token);
      }).then(() => {
        updatePlaylistData();
      })
    })
  }

  async function createNewPlaylistTopSongs() {
    createNewPlaylist(token, newPlaylistLength, timeRange).then(playlistId => {
      getTopTracks(token, newPlaylistLength, timeRange).then((tracks) => {
        addToPlaylist(playlistId, tracks, token);
      }).then(() => {
        updatePlaylistData();
      })
    })
  }

  return (
    <StyledCreatePlaylist>
      <Wrapper style={{ flexGrow: 6 }}>
        <Row align="middle" gutter={[0, 16]}>
          <Col>
            <Typography.Title
              style={{ margin: '12px 0' }}
              level={2}
            >New playlist based on your favorites</Typography.Title>
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 16]}>
          <Col>
            <InputNumber
              size="large"
              min={1}
              max={50}
              value={newCustomPlaylistLength}
              onChange={(e) => { typeof e === 'number' && setNewCustomPlaylistsLength(e) }}
            />
          </Col>
          <Col>
            <Typography.Title
              style={{ margin: '12px 0' }}
              level={5}
            >
              songs
            </Typography.Title>
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 16]}>
          <Col>
            <Typography.Title
              style={{ margin: 0 }}
              level={5}
            >
              based on the last
            </Typography.Title>
          </Col>
          <Col>
            <Select
              size="large"
              style={{ width: '180px' }}
              options={options}
              value={customTimeRange}
              onChange={setCustomTimeRange}
            />
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 16]}>
          <Col flex="100%">
            <SelectTagMode
              options={artists}
              values={selectedArtists}
              handleChange={setSelectedArtists}
            />
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 16]}>
          <Col flex="100%">
            <SelectTagMode
              options={yourTracks}
              values={selectedTrack}
              handleChange={setSelectedTrack}
            />
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 16]}>
          <Col flex="100%">
            <SelectTagMode
              options={yourGenres}
              values={selectedYourGenre}
              handleChange={setSelectedYourGenre}
            />
          </Col>
        </Row>
        <Row>
          <Button onClick={createNewCustomizedPlaylist}>GO</Button>
        </Row>
      </Wrapper>

      <Wrapper style={{ flexGrow: 1 }}>
        <Row align="middle" gutter={[0, 16]}>
          <Col>
            <Typography.Title
              style={{ margin: '12px 0' }}
              level={2}
            >New playlist of your favorite songs</Typography.Title>
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 16]}>
          <Col flex="100px">
            <InputNumber
              size="large"
              min={1}
              max={50}
              value={newPlaylistLength}
              onChange={(e) => { typeof e === 'number' && setNewPlaylistsLength(e) }}
            />
          </Col>
          <Col flex="auto">
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
            >
              random songs of your top 50
            </Typography.Title>
          </Col>
        </Row>
        <Row align="middle" gutter={[16, 16]}>
          <Col>
            <Typography.Title
              level={5}
              style={{ margin: 0 }}
            >
              based on the last
            </Typography.Title>
          </Col>
          <Col>
            <Select
              size="large"
              style={{ width: '180px' }}
              options={options}
              value={timeRange}
              onChange={setTimeRange}
            />
          </Col>
        </Row>
        <Col span={24}>
          <Button onClick={createNewPlaylistTopSongs}>GO</Button>
        </Col>
      </Wrapper>
    </StyledCreatePlaylist>
  );
}

export default CreatePlaylist;

