import { Artist } from "spotify-types";
import { SelectOptionType } from "../Components/SelectTagMode/SelectTagMode";

/**
 * gets top 50 artists of the current user
 * @param token 
 * @param timeRange 
 * @returns 
 */
export async function getYourTopArtists (token: string, timeRange: string) {
  const result = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=' +  timeRange + '&limit=50', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => response.json())
  .then((data) => {
    const artists: SelectOptionType[] = data.items?.map((item: Artist) => { return {
      value: item.id,
      label: item.name,
      image: item.images[0].url
    }});
    return artists;
  });
  return result;
}
