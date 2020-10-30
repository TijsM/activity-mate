import React, { useState, useEffect, useContext } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";
import getLastDays from '../../../lib/getLastDays'

import FeedCard from "../Card";

import getAverage from '../../../lib/getAverage'

function HeartRate() {
  const { userData } = useContext(WithingsContext);

  // in bpm
  const [averageSleepHr, setAverageSleepHr] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setAverageSleepHr(getAverageSleepHr(getLastDays(userData.sleep, 1)));
    }
  }, [userData]);


  const getAverageSleepHr = (sleep) => {
    return getAverage(sleep.map((night) => night.data.hr_average));
  };

  return (
    <FeedCard
      activity="Sleep"
      title="Heart rate by night"
      context="Last night, your average heart rate was"
      highlight={`${Math.round(averageSleepHr)} bpm`}
      detailRoute="/heart-rate"
    />
  );
}
export default HeartRate;
