import React, { useEffect, useState, useCallback } from "react";
import './App.css';
import DisplayPlaylists from "./Components/DisplayPlaylists/DisplayPlaylists";
import { App as AntApp, Col, ConfigProvider, Row } from 'antd';
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import { Button } from "./Components/Button/Button";

function App() {
  const CLIENT_ID = ""
  const REDIRECT_URI = ""
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const REFRESH_TOKEN = ""
  const CLIENT_SECRET = ""

  const [token, setToken] = useState<string>();

  useEffect(() => {
    const tokenFromStorage = window.localStorage.getItem("token");
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    } else {
      refreshToken();
    }
  }, [token])

  const logout = useCallback(() => {
    setToken("");
    window.localStorage.removeItem("token");
  }, [token]);

  const refreshToken = useCallback(async () => {
    const r = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'refresh_token',
        'refresh_token': REFRESH_TOKEN,
        'redirect_uri': REDIRECT_URI
      })
    }).then((response) => {
      return response.json();
    });
    window.localStorage.setItem("token", r.access_token)
    setToken(r.access_token);
  }, [token]);

  return (
    <div className="App">
      <div className="App-header">
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
            Login to Spotify
          </a>
          : (
            <Row justify="end" gutter={8}>
              <Col>
                <Button type="default" onClick={logout}>Logout</Button>
              </Col>
              <Col>
                <Button type="default" onClick={refreshToken}>Refresh Token</Button>
              </Col>
            </Row>
          )}
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