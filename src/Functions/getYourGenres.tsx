/**
 * returns array of genres which are attributed to at least two artists the user listened to during timeRange(param)
 * @param token 
 * @param timeRange 
 * @returns 
 */

import { Artist } from "spotify-types";
import { SelectOptionType } from "../Components/SelectTagMode/SelectTagMode";

interface GenreAndPopularity {
  name: string;
  popularity: number;
}

export async function getYourGenres(token: string, timeRange: string) {
  const result = await fetch('https://api.spotify.com/v1/me/top/artists?time_range=' + timeRange + '&limit=50', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then((response) => response.json())
    .then((data) => {
      const genresFromArtists = data?.items?.map((artist: Artist) => { return artist.genres; }).flatMap((genre: string) => genre) as string[];

      const counts: { [key: string]: number; } = {};
      for (const num of genresFromArtists) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }

      const genresAndPopularity: GenreAndPopularity[] = [];

      genresFromArtists?.map((item: string) => {
        if (counts[item] > 1) {
          genresAndPopularity.push({
            name: item,
            popularity: counts[item]
          })
        }
      })

      const uniqueArray = genresAndPopularity.filter((value, index: number) => {
        const _value = JSON.stringify(value);
        return index === genresAndPopularity.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        });
      });

      uniqueArray.sort((a, b) => b.popularity - a.popularity);

      const genreItems: SelectOptionType[] = uniqueArray?.map((item) => {
        return {
          value: item.name[0]?.toUpperCase() + item.name?.substring(1),
          label: item.name[0]?.toUpperCase() + item.name?.substring(1)
        }
      });
      return genreItems;
    });
  return result;
}