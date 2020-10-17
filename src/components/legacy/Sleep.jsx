import React, { useContext, useState, useEffect } from "react";
import { WithingsContext } from "../../contexts/WithingsContext";
import { getYesterday } from "../../lib/getWithingsDate";
import getLastDays from "../../lib/getLastDays";
import getAverage from "../../lib/getAverage";
import ActivityBlock from "./ActivityBlock";

import { Section } from "../../styles/Section";
import { H2, SubTitle } from "../../styles/Types";

function Sleep() {
  const { userData } = useContext(WithingsContext);

  const [todaySleep, setTodaySleep] = useState();
  const [lastWeekSleep, setLastWeekSleep] = useState();
  const [lastMonthSleep, setLastMonthSleep] = useState();

  useEffect(() => {
    if (userData.sleep) {
      const today = userData.sleep.find((day) => day.date === getYesterday());

      setTodaySleep(today);
      setLastWeekSleep(getLastDays(userData.sleep, 7));
      setLastMonthSleep(getLastDays(userData.sleep, 30));
    }
  }, [userData]);


  return (
    <Section>
      <H2>Sleep score</H2>
      <SubTitle>
        Comparing your overal sleep score over a longer period of time
      </SubTitle>
      <ActivityBlock
        title="Yesterday"
        subTitle="Yesterday compared to last week's average"
        shortTerm={todaySleep?.data?.sleep_score}
        longTerm={
          lastWeekSleep &&
          getAverage(lastWeekSleep?.map((day) => day.data.sleep_score))
        }
      />
      <ActivityBlock
        title="Last week"
        subTitle="last week's average compared to last month's average"
        shortTerm={
          lastWeekSleep &&
          getAverage(lastWeekSleep.map((day) => day.data.sleep_score))
        }
        longTerm={
          lastMonthSleep &&
          getAverage(lastMonthSleep.map((day) => day.data.sleep_score))
        }
      />
      <ActivityBlock
        title="Last month"
        subTitle="last month's average compared to last years's average"
        shortTerm={
          lastMonthSleep &&
          getAverage(lastMonthSleep.map((day) => day.data.sleep_score))
        }
        longTerm={
          userData.sleep &&
          getAverage(userData.sleep.map((day) => day.data.sleep_score))
        }
      />
    </Section>
  );
}

export default Sleep;
