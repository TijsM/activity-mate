import React from "react";
import { useEffect, useState, useContext } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";

import getAverageNightDuration from "../../../lib/getAverageNightDuration";
import formatTimeFromMinutes from "../../../lib/formatTimeFromMinutes";

import FeedCard from "../Card";

function SleepDuration() {
  const { userData } = useContext(WithingsContext);

  // in minutes
  const [averageNightDuration, setAverageNightDuration] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setAverageNightDuration(getAverageNightDuration(userData.sleep, 1));
    }
  }, [userData]);

  return (
    <FeedCard
      activity="Sleep"
      title="Sleep duration"
      context="Last night you slept "
      highlight={`${formatTimeFromMinutes(
        Math.round(averageNightDuration),
        "u ",
        "min"
      )}`}
      detailRoute="/night-duration"
    />
  );
}

export default SleepDuration;
