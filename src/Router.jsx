import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import HeartRate from "./pages/detail/HeartRate";
import NightDuration from "./pages/detail/SleepDuration";
import Calories from "./pages/detail/Calories";
import DeepSleep from "./pages/detail/DeepSleep";
import TimeToBed from "./pages/detail/TimeToBed"
import Steps from "./pages/detail/Steps"

function Routing() {
  return (
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
        <Route path="/steps">
          <Steps />
        </Route>
        <Route path="/">
          <Feed />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routing;
