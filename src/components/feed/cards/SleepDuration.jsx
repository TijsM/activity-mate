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
      setAverageNightDuration(getAverageNightDuration(userData.sleep));
    }
  }, [userData]);

  return (
    <FeedCard
      activity="Sleep"
      title="Sleep duration"
      context="Your average night is"
      highlight={`${formatTimeFromMinutes(
        Math.round(averageNightDuration),
        "u ",
        "min"
      )}`}
      change=""
      detailRoute="/night-duration"
    />
  );
}

export default SleepDuration;
