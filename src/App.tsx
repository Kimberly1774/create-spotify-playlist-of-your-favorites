import React, { useEffect, useState } from "react";
import './App.css';
import DisplayPlaylists from "./Components/DisplayPlaylists/DisplayPlaylists";
import { App as AntApp, ConfigProvider } from 'antd';
import theme from "./theme";
import { ThemeProvider } from "styled-components";

function App() {
  const CLIENT_ID = ""
  const REDIRECT_URI = ""
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const [token, setToken] = useState<string>();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash?.substring(1).split("&").find(elem => elem.startsWith("access_token"))?.split("=")[1] || '';
      window.location.hash = ""
      window.localStorage.setItem("token", token)
      setToken(token)
    }

    if (token) {
      setToken(token);
    } else {
      o();
    }
  }, [])

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  }

  async function o() {
    const r = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        'client_id': CLIENT_ID,
        'client_secret': '',
        'grant_type': '',
        'refresh_token': '',
        'redirect_uri': REDIRECT_URI
      })
    }).then((response) => {
      return response.json();
    });
    window.localStorage.setItem("token", r.access_token)
    setToken(r.access_token);
  }

  return (
    <div className="App">
      <div className="App-header">
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            Login to Spotify
          </a>
          : <div><button onClick={logout}>Logout</button><button onClick={() => o()}>o</button></div>}
      </div>
      <div>
        <ThemeProvider theme={theme}>
          <ConfigProvider
            theme={{
              ...theme,
            }}
          >
            <AntApp>
              {token && <DisplayPlaylists token={token} />}
            </AntApp>
          </ConfigProvider>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default App;