import React, { useContext, useState, useEffect } from "react";
import { WithingsContext } from "../contexts/WithingsContext";
import { getYesterday } from "../lib/getWithingsDate";
import getLastDays from '../lib/getLastDays'
import getAverage from '../lib/getAverage'
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
      setLastWeekActivity(getLastDays(userData.dailyData, 7));
      setLastMonthActivity(getLastDays(userData.dailyData, 30));
    }
  }, [userData]);


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
