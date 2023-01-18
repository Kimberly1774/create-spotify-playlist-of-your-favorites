export async function updatePlaylistData(token: string, id: string, description: string) {
  fetch('https://api.spotify.com/v1/playlists/' + id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify({
      'description': description,
      'public': false
    })
  });
}