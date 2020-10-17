import React, { useEffect, useState } from "react";
import getAccessToken from "./lib/getAccessToken";
import { WithingsContext } from "./contexts/WithingsContext";
import "./App.css";

import Auth from "./pages/Auth";
import Feed from "./pages/Feed";

function App() {
  const [userData, setUserData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState();
  const [isExpired, setIsExpired] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");
    const code = urlParams.get("code");
    if (state === "authenticated") {
      getAccessToken(code);
    }

    setUserToken(localStorage.getItem("access_token"));
    const expires = new Date(localStorage.getItem("token_expiration"));
    setIsExpired(expires > new Date());
  }, []);

  useEffect(() => {
    setIsAuthenticated(userToken && !isExpired);
  }, [userToken, isExpired]);

  return (
    <div className="App">
      {isAuthenticated ? (
        <WithingsContext.Provider value={{ userData, setUserData }}>
          <Feed />
        </WithingsContext.Provider>
      ) : (
        <Auth />
      )}
    </div>
  );
}

export default App;
