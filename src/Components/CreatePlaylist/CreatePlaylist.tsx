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
  updatePlaylistData: Function;
}

const Wrapper = styled.div`
  background: #fafafa;
  gap: ${props => props.theme.spacing.m};
  margin: auto;
  justify-content: center;
  margin: 24px 20px 48px 20px;
  min-width: 400px;
  padding: ${props => props.theme.spacing.m};
  ${props => props.theme.shadow.light};
`;

const CreatePlaylist = ({ token, updatePlaylistData }: CreatePlaylistProps) => {
  const [newPlaylistLength, setNewPlaylistsLength] = useState<number>(5);
  const [newCustomPlaylistLength, setNewCustomPlaylistsLength] = useState<number>(5);
  const [yourGenres, setYourGenres] = useState<SelectOptionType[]>();
  const [yourTracks, setYourTracks] = useState<SelectOptionType[]>();
  const [artists, setArtists] = useState<SelectOptionType[]>();
  const [selectedTrack, setSelectedTrack] = useState<SelectOptionType[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<SelectOptionType[]>([]);
  const [selectedYourGenre, setSelectedYourGenre] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState<string>('medium_term');
  const [customTimeRange, setCustomTimeRange] = useState<string>('medium_term');

  function returnValuesNItems(arr: SelectOptionType[], count = 3) {
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
      setSelectedArtists(artists?.slice(0, 3));
    });
    await getYourTracks(token, customTimeRange).then((tracks) => {
      setYourTracks(tracks);
      setSelectedTrack(tracks?.slice(0, 3));
    });
  }

  useMemo(() => {
    getAndSetSeeds();
  }, [customTimeRange]);

  async function createNewCustomizedPlaylist() {
    let artistSeed: string;
    if (selectedArtists[0]?.value) {
      artistSeed = selectedArtists.map((val) => val.value).join('&');
    } else {
      artistSeed = selectedArtists.join('&') || '';
    }

    let trackSeed: string;
    if (selectedTrack[0]?.value) {
      trackSeed = selectedTrack.map((val) => val.value).join('&') || '';
    } else {
      trackSeed = selectedTrack.join('&') || '';
    }

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
    createNewPlaylist(token, newPlaylistLength, 'top').then(playlistId => {
      getTopTracks(token, newPlaylistLength, timeRange).then((tracks) => {
        addToPlaylist(playlistId, tracks, token);
      }).then(() => {
        updatePlaylistData();
      })
    })
  }

  return (
    <StyledCreatePlaylist>
      <Wrapper>
        <Row align="middle" gutter={[0, 16]}>
          <Row align="middle" gutter={[16, 0]}>
            <Col>
              <Typography.Title
                style={{ margin: 0 }}
                level={3}
              >Create a randomized playlist of your favorites</Typography.Title>
            </Col>

            <Col flex="none">
              <Typography.Title
                level={3}
                style={{ margin: 0 }}
              >
                based on the last
              </Typography.Title>
            </Col>
          </Row>

          <Col span={24}>
              <Select
                size="large"
                style={{ width: '300px' }}
                options={options}
                value={timeRange}
                onChange={(value: string) => setTimeRange(value)}
              />
            </Col>
          <Row align="middle" gutter={[16, 42]}>
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
                level={3}
                style={{ margin: 0 }}
              >
                songs
              </Typography.Title>
            </Col>
            <Col span={24}>
              <Button onClick={() => createNewPlaylistTopSongs()}>GO</Button>
            </Col>
          </Row>


        </Row>
      </Wrapper>

      <Wrapper>
        <Row gutter={[0, 16]}>
          <Col span={24}>
            <Row align="middle" gutter={[16, 0]}>
              <Col>
                <Typography.Title
                  style={{ margin: 0 }}
                  level={3}
                >Create a playlist</Typography.Title>
              </Col>
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
                  style={{ margin: 0 }}
                  level={3}
                >
                  songs based on your favorites for
                </Typography.Title>
              </Col>
              <Col>
                <Select
                  size="large"
                  style={{ width: '180px' }}
                  options={options}
                  value={customTimeRange}
                  onChange={(value: string) => setCustomTimeRange(value)}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <SelectTagMode
              options={artists}
              values={selectedArtists}
              handleChange={setSelectedArtists}
            />
          </Col>
          <Col span={24}>
            <SelectTagMode
              options={yourTracks}
              values={selectedTrack}
              handleChange={(value: any) => setSelectedTrack(value)}
            />
          </Col>
          <Col span={24}>
            <SelectTagMode
              options={yourGenres}
              values={selectedYourGenre}
              handleChange={(value: any) => setSelectedYourGenre(value)}
            />
          </Col>
          <Col span={12}>
            <Button onClick={() => createNewCustomizedPlaylist()}>GO</Button>
          </Col>
        </Row>
      </Wrapper>
    </StyledCreatePlaylist>
  );
}

export default CreatePlaylist;

