async function stringify(str: object) {
  return await JSON.stringify(str);
}

/**
 * Creates a new empty playlist.
 * Saves optional parameters to title/description.
 * These can be used to generate tracks based on the passed data.
 * @param token 
 * @param newPlaylistLength 
 * @param selectedGenreSeed 
 * @param artistSeed 
 * @param trackSeed 
 * @returns 
 */

export async function createNewPlaylist(token: string, newPlaylistLength = 5, timeRange = "medium_range", selectedGenreSeed = 'top', artistSeed = '', trackSeed?: string) {
  return await stringify({
    "l": newPlaylistLength,
    "g": selectedGenreSeed,
    "a": artistSeed,
    "tS": trackSeed,
    "t": timeRange
  })
    .then((descriptionStringified) => {
      return fetch('https://api.spotify.com/v1/users/1131858986/playlists', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
          'name': 'My Faves' + ' - ' + selectedGenreSeed,
          'description': descriptionStringified,
          'collaborative': false,
          'public': false
        })
      })
        .then((response) => response.json())
        .then((data) => {
          return data.id;
        })
        .catch((error) => {
          console.error('Error:', error);
        })
    });
}