import { Track } from "spotify-types";
import { SelectOptionType } from "../Components/SelectTagMode/SelectTagMode";

/**
 * gets top 50 tracks of the current user 
 * @param token
 * @param timeRange
 * @returns SelectOptionType[]
 */
export async function getYourTracks(token: string, timeRange = 'medium_term') {
  const tracks: SelectOptionType[] = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=' + timeRange + '&limit=' + 50 + '&offset=' + 0, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => response.json())
  .then((data) => {
    const tracksFormat = data.items?.map((item: Track) => { return {
      value: item.id,
      label: item.name,
      image: item.album.images[0].url
    }});
    return (tracksFormat);
  });
  return tracks;
}
