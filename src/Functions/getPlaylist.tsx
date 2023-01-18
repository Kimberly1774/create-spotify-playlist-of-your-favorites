/**
 * get playlist by id
 * @param id 
 * @param token 
 * @returns 
 */

export async function getPlaylist(id: string, token: string) {
  const updatedPlaylist = await fetch('https://api.spotify.com/v1/playlists/' + id, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return updatedPlaylist;
}
