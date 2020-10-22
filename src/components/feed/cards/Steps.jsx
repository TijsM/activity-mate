import React from "react";
import { useEffect, useState, useContext } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";

import getLastDays from "../../../lib/getLastDays";

import FeedCard from "../Card";

function Steps() {
  const { userData } = useContext(WithingsContext);

  const [todaySteps, setTodaySteps] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setTodaySteps(getLastDays(userData.dailyData, 1)[0].steps);
    }
  }, [userData]);

  return (
    <FeedCard
      activity="Activity"
      title="Steps"
      context="Today you already have  "
      highlight={todaySteps + " steps"}
      detailRoute="/steps"
    />
  );
}

export default Steps;
