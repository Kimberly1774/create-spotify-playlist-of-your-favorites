import { Track } from "spotify-types";

/**
 * returns n random songs from users top 50 tracks (n = trackCount)
 * @param token
 * @param trackCount 
 * @param timeRange 
 * @returns 
 */
export async function getTopTracks(token: string, trackCount = 5, timeRange = 'medium_term') {
  const randomizeTopTracks: number[] = [];
  while(randomizeTopTracks.length < trackCount){
    const r = Math.floor(Math.random() * 49) + 1;
    if(randomizeTopTracks.indexOf(r) === -1) randomizeTopTracks.push(r);
  }

  const tracks = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=' + timeRange + '&limit=' + 50 + '&offset=0', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  .then((response) => response.json())
  .then((data) => {
    const randomizedTracksFromData = data.items.filter((item: Track, index: number) => randomizeTopTracks.includes(index));

    return (randomizedTracksFromData);
  }).catch((err) => {
    console.error(err, 'ERR');
  });
  return tracks;
}
