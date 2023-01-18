import { Track } from "spotify-types";

/**
 * adds tracks to a playlist
 * @param playlistId playlist to add songs to
 * @param tracks tracks to add to the playlist
 * @param token
 * @returns
 */

export async function addToPlaylist (playlistId: string, tracks: Track[], token: string) {
  const uriTracks = tracks?.map(track => track.uri).join();
  const o = await fetch('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks?uris=' + uriTracks, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
  });
  return o;
}