import React, { useState, useEffect, useContext } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";
import getAverage from "../../../lib/getAverage";
import FeedCard from "../Card";

function HeartRate() {
  const { userData } = useContext(WithingsContext);

  // in bpm
  const [averageSleepHr, setAverageSleepHr] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setAverageSleepHr(getAverageSleepHr(userData.sleep));
    }
  }, [userData]);

  const getAverageSleepHr = (sleep) => {
    return getAverage(sleep.map((night) => night.data.hr_average));
  };

  return (
    <FeedCard
      activity="Sleep"
      title="Heart rate by night"
      context="Your average heart rate when sleeping"
      highlight={`${Math.round(averageSleepHr)} bpm`}
      change=""
      detailRoute="/heart-rate"
    />
  );
}
export default HeartRate;
