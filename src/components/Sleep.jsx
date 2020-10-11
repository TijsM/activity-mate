import React, { useContext, useState, useEffect } from "react";
import { WithingsContext } from "../contexts/WithingsContext";
import { getYesterday, getJsDate } from "../lib/getWithingsDate";

import { Section } from "../styles/Section";
import { H2, SubTitle } from "../styles/Types";

function Sleep() {
  const { userData } = useContext(WithingsContext);

  const [todaySleep, setTodaySleep] = useState();
  const [lastWeekSleep, setLastWeekSleep] = useState();
  const [lastMonthSleep, setLastMonthSleep] = useState();

  useEffect(() => {
    if (userData.sleep) {
      const today = userData.sleep.find((day) => day.date === getYesterday());

      setTodaySleep(today);
      setLastWeekSleep(getLastDays(userData, 7));
      setLastMonthSleep(getLastDays(userData, 30));
    }
  }, [userData]);

  const getLastDays = (userData, days) => {
    const todayDate = new Date();

    const lastDays = userData.sleep.filter((day) => {
      const date = getJsDate(day);
      if (date.getTime() > todayDate.getTime() - 1000 * 60 * 60 * 24 * days) {
        return true;
      }
    });

    return lastDays;
  };

  console.log(todaySleep, lastWeekSleep, lastMonthSleep)

  return (
    <Section>
      <H2>Sleep score</H2>
      <SubTitle>
        Comparing your overal sleep score over a longer period of time
      </SubTitle>
    </Section>
  );
}

export default Sleep;
