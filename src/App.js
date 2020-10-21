import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { WithingsContext } from "./contexts/WithingsContext";

import getAccessToken from "./lib/getAccessToken";
import { getActivities, getSleep } from "./lib/fetchWithings";

import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import HeartRate from "./pages/detail/HeartRate";
import NightDuration from './pages/detail/SleepDuration'

import Theme from "./Theme";

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
    const expires = parseInt(localStorage.getItem("token_expiration"), 10);

    setIsExpired(expires < new Date().getTime());
  }, []);

  useEffect(() => {
    setIsAuthenticated(userToken && !isExpired);
  }, [userToken, isExpired]);

  useEffect(() => {
    const fetchData = async () => {
      const activities = await getActivities();
      const sleep = await getSleep();
      setUserData({ dailyData: activities, sleep });
    };

    fetchData();
  }, [isAuthenticated]);

  return (
    <Theme>
      {isAuthenticated ? (
        <WithingsContext.Provider value={{ userData, setUserData }}>
          <Router>
            <Switch>
              <Route path="/heart-rate">
                <HeartRate />
              </Route>
              <Route path="/night-duration">
                <NightDuration
                 />
              </Route>
              <Route path="/">
                <Feed />
              </Route>
            </Switch>
          </Router>
        </WithingsContext.Provider>
      ) : (
        <Auth />
      )}
    </Theme>
  );
}

export default App;
