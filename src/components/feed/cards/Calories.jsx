import React, { useState, useEffect, useContext } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";
import { getYesterday } from "../../../lib/getWithingsDate";
import FeedCard from "../Card";

function Calories() {
  const { userData } = useContext(WithingsContext);

  // in kcal
  const [todayBurnedCalories, setTodayBurnedCalories] = useState();

  useEffect(() => {
    if (userData.dailyData) {
      const today = userData.dailyData.find(
        (day) => day.date === getYesterday()
      );
      setTodayBurnedCalories(today.calories);
    }
  }, [userData]);

  return (
    <FeedCard
      activity="Activity"
      title="Extra calories burned a day"
      context="Extra calories burned yesterday"
      highlight={Math.round(todayBurnedCalories) + " kcal"}
      detailRoute="/burned-calories"
    />
  );
}
export default Calories;
