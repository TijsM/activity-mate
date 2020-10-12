import React, { useContext, useEffect, useState } from "react";
import { WithingsContext } from "../contexts/WithingsContext";
import getAverage from "../lib/getAverage";
import getLastDays from "../lib/getLastDays";

import { Section } from "../styles/Section";
import { H2, SubTitle } from "../styles/Types";
import {} from "react";

function NightsOut() {
  const { userData } = useContext(WithingsContext);
  const [averageSleepHr, setAverageSleepHr] = useState(0);
  const [averageSleepTimeInMinutes, setAverageSleepTimeInMinutes] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setAverageSleepHr(
        getAverage(userData.sleep.map((night) => night.data.hr_average))
      );

      setAverageSleepTimeInMinutes(
        getAverage(
          userData.sleep.map((night) => {
            const date = new Date(night.startdate * 1000);
            let minutesInDay = date.getHours() * 60 + date.getMinutes();
            // you can't go to sleep after 10 in the morning
            if (minutesInDay < 60 * 10) {
              minutesInDay = minutesInDay =
                (date.getHours() + 24) * 60 + date.getMinutes();
            }
            return minutesInDay;
          })
        )
      );
    }
  }, [userData]);

  const formatTimeFromMinutes = (minutes) => {
    const hr = Math.floor((minutes / 60) % 24);
    const min = Math.round(((((minutes / 60) % 24) - hr) / 100) * 60 * 100);
    return `${hr}:${min < 10 ? `0${min}` : min}`;
  };

  return (
    <Section>
      <H2>Drunk nights</H2>
      <SubTitle>
        By looking at your average heart raten and the time you went to bed we
        can guess if you went out or not
      </SubTitle>
      your average HR during the nights is {Math.round(averageSleepHr)}
      <br />
      your average time to go to bed is{" "}
      {formatTimeFromMinutes(averageSleepTimeInMinutes)}
    </Section>
  );
}

export default NightsOut;
