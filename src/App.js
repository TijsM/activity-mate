import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { WithingsContext } from "./contexts/WithingsContext";

import { getActivities, getSleep } from "./lib/fetchWithings";

import Auth from "./pages/Auth";
import Feed from "./pages/Feed";

import useAuth from './hooks/useAuth'

import HeartRate from "./pages/detail/HeartRate";
import NightDuration from "./pages/detail/SleepDuration";
import Calories from "./pages/detail/Calories";
import DeepSleep from "./pages/detail/DeepSleep";
import TimeToBed from "./pages/detail/TimeToBed"

import Theme from "./Theme";

function App() {
  const [userData, setUserData] = useState({});
  const isAuthenticated = useAuth()

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
                <NightDuration />
              </Route>
              <Route path="/burned-calories">
                <Calories />
              </Route>
              <Route path="/deep-sleep">
                <DeepSleep />
              </Route>
              <Route path="/time-to-bed">
                <TimeToBed />
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
