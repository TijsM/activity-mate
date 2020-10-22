import React from "react";
import { useEffect, useState, useContext } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";

import getLastDays from "../../../lib/getLastDays";

import FeedCard from "../Card";

function Workouts() {
  const { userData } = useContext(WithingsContext);

  const [lastWeekWorouts, setLastWeekWorkouts] = useState(0);

  useEffect(() => {
    if (userData.workouts) {
      setLastWeekWorkouts(getAmountOfWorkouts(userData.workouts, 7));
    }
  }, [userData]);

  const getAmountOfWorkouts = (workouts, amount) => {
    return getLastDays(workouts, amount).length;
  };

  return (
    <FeedCard
      activity="Activity"
      title="Amount of registred workouts"
      context="During the last 7 days, you did"
      highlight={lastWeekWorouts + " workouts"}
      detailRoute="/amount-of-workouts"
    />
  );
}

export default Workouts;
