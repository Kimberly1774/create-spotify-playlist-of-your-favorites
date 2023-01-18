import { PlaylistTrack } from "spotify-types";
/**
 * get a track by its id
 * @param id 
 * @param token 
 * @returns 
 */
export async function getTrack (id: string, token: string) {
  const track = await fetch('https://api.spotify.com/v1/playlists/' + id + '/tracks', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
  .then((response) => response.json())
  .then((data) => {
    return data.items?.map((track: PlaylistTrack) => track.track);
  });
  return track;
}