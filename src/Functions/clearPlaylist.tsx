import { Track } from "spotify-types";

/**
 * removes passed tracks from a playlist
 * @param id 
 * @param tracks 
 * @param token 
 */

export function clearPlaylist (playlistId: string, tracks: Track[], token: string) {
  const uriTracks = tracks?.map(track => track.uri).join();
  let tracksForBody = "{\"tracks\":[";
  tracks.forEach((track) => tracksForBody += `{"uri":"${track.uri}"},`);
  tracksForBody = tracksForBody.substring(0, tracksForBody.length - 1);
  tracksForBody += `]}`;

  fetch('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks?uris=' + uriTracks, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: tracksForBody
  });
}