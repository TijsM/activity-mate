import React, { useContext, useState, useEffect } from "react";
import { WithingsContext } from "../contexts/WithingsContext";
import { Section } from "../styles/Section";
import { getYesterday } from "../lib/getWithingsDate";

function DailyActivity() {
  const { userData } = useContext(WithingsContext);
  const [todayActivity, setTodayActivity] = useState();
  const [lastWeekActivity, setLastWeekActivity] = useState();
  const [lastMonthActivity, setLastMonthActivity] = useState();

  useEffect(() => {
    if (userData.dailyData) {
      const today = userData.dailyData.find(
        (day) => day.date === getYesterday()
      );
      setTodayActivity(today);
      setLastWeekActivity(getLastDays(userData, 7));
      setLastMonthActivity(getLastDays(userData, 30));
    }
  }, [userData]);

  const getLastDays = (userData, days) => {
    const todayDate = new Date();

    const lastDays = userData.dailyData.filter((day) => {
      const date = new Date(
        day.date.split("-")[0],
        day.date.split("-")[1] - 1,
        day.date.split("-")[2]
      );
      if (date.getTime() > todayDate.getTime() - 1000 * 60 * 60 * 24 * days) {
        return true;
      }
    });

    return lastDays;
  };

  const getAverage = (numbers) => {
    let sum = 0;
    numbers.forEach((number) => {
      sum += number;
    });

    return sum / numbers.length;
  };

  return (
    <Section>
      <div>
        {todayActivity && todayActivity.calories}/
        {lastWeekActivity &&
          getAverage(lastWeekActivity.map((day) => day.calories))}
      </div>
      <div>
        {lastWeekActivity &&
          getAverage(lastWeekActivity.map((day) => day.calories))}
        /
        {lastMonthActivity &&
          getAverage(lastMonthActivity.map((day) => day.calories))}
      </div>
      <div>

        {lastMonthActivity &&
          getAverage(lastMonthActivity.map((day) => day.calories))}
          /
          {userData.dailyData &&
          getAverage(userData.dailyData.map((day) => day.calories))}
      </div>
    </Section>
  );
}

export default DailyActivity;
