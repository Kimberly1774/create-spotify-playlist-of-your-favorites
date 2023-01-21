import { Playlist } from "spotify-types";

export async function getPlaylists(token: string) {
  return fetch('https://api.spotify.com/v1/users/1131858986/playlists?limit=15&offset=0', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data.items?.filter((play: Playlist) => play.name.includes('My Faves'));
    })
}
