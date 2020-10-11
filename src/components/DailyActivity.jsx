import React, { useContext, useState, useEffect } from "react";
import { WithingsContext } from "../contexts/WithingsContext";
import { getYesterday, getJsDate } from "../lib/getWithingsDate";
import ActivityBlock from "../components/ActivityBlock";

import { H2, SubTitle } from "../styles/Types";
import { Section } from "../styles/Section";


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
      const date = getJsDate(day)
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
      <H2>Activity</H2>
      <SubTitle>
        Based on your calories we will compare your efforts with you history
      </SubTitle>
      <ActivityBlock
        title="Yesterday"
        subTitle="Yesterday compared to last week's average"
        shortTerm={todayActivity?.calories}
        longTerm={
          lastWeekActivity &&
          getAverage(lastWeekActivity?.map((day) => day.calories))
        }
      />
      <ActivityBlock
        title="Last week"
        subTitle="last week's average compared to last month's average"
        shortTerm={
          lastWeekActivity &&
          getAverage(lastWeekActivity.map((day) => day.calories))
        }
        longTerm={
          lastMonthActivity &&
          getAverage(lastMonthActivity.map((day) => day.calories))
        }
      />
      <ActivityBlock
        title="Last month"
        subTitle="last month's average compared to last years's average"
        shortTerm={
          lastMonthActivity &&
          getAverage(lastMonthActivity.map((day) => day.calories))
        }
        longTerm={
          userData.dailyData &&
          getAverage(userData.dailyData.map((day) => day.calories))
        }
      />
    </Section>
  );
}

export default DailyActivity;
