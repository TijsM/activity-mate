import React, { useState, useEffect, useContext } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";
import getAverage from '../../../lib/getAverage'
import getLastDays from '../../../lib/getLastDays'
import FeedCard from "../Card";

function Content() {
  const { userData } = useContext(WithingsContext);

  // in bpm
  const [averageSleepHr, setAverageSleepHr] = useState(0);
  const [monthAverageHr, setMonthAverageHr] = useState(0);
  const [weekAverageHr, setWeekAverageHr] = useState(0);
  const [lastNightAverageHr, setLastNightAverageHr] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setAverageSleepHr(getAverageSleepHr(userData.sleep));
      setMonthAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 30)));
      setWeekAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 7)));
      setLastNightAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 1)));
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
      change="-14%"
      data={{
          average: averageSleepHr,
          month: monthAverageHr,
          week: weekAverageHr,
          day: lastNightAverageHr,
          unit: 'bpm'
      }}
    />
  );
}
export default Content;
