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
      setLastMonthActivity(getLastDays(userData, 30))
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

  console.log("yesterday", todayActivity);
  console.log("lastWeek", lastWeekActivity);
  console.log("lastMonth", lastMonthActivity)

  return <Section>yyiikes</Section>;
}

export default DailyActivity;
