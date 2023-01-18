import { Track } from "spotify-types";

/**
 * returns recommended tracks based on seeds passed as parameters
 * @param token
 * @param genre 
 * @param trackCount amount of tracks which will be returned
 * @param artists 
 * @param tracks 
 * @returns 
 */
export async function getRecommendedTracks(token: string, genre: string, trackCount = 5, artists?: string, tracks?: string) {
  const dataTracks = await fetch('https://api.spotify.com/v1/recommendations?seed_artists=&limit=' + trackCount + '&' + artists + '&seed_genres=' + genre + '&seed_tracks=' + tracks, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => response.json())
  .then((data) => {
    const tracks_: Track[] = data.tracks;
    return tracks_;
  });
  return dataTracks;
}
