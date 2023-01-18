import React, { useState } from "react";
import axios from 'axios';
import { Artist } from "spotify-types";

export const SearchArtists = ( token: string ) => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [artists, setArtists] = useState<Artist[]>([]);

  const searchArtists = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })
    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.images.length ? <img width={"10px"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
        {artist.name}
      </div>
    ))
  }

  return (
    <div>
      <form onSubmit={searchArtists}>
        <input type="text" onChange={e => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>
      {renderArtists()}
    </div>
  )
}