import React, { useContext, useEffect, useState } from "react";
import { WithingsContext } from "../../contexts/WithingsContext";
import getAverage from "../../lib/getAverage";

import { Section } from "../../styles/Section";
import { H2, SubTitle } from "../../styles/Types";
import {} from "react";
import getLastDays from "../../lib/getLastDays";

function SleepQuality() {
  const { userData } = useContext(WithingsContext);

  // in bpm
  const [averageSleepHr, setAverageSleepHr] = useState(0);
  const [monthAverageHr, setMonthAverageHr] = useState(0);
  const [weekAverageHr, setWeekAverageHr] = useState(0);

  // in minutes from start of the day
  const [averageTimeToBed, setAverageTimeToBed] = useState(0);
  const [monthTimeToBed, setMonthTimeToBed] = useState(0);
  const [weekTimeToBed, setWeekTimeToBed] = useState(0);

  // in minutes
  const [averageNightDuration, setAverageNightDuration] = useState(0);
  const [monthNightDuration, setMonthNightDuration] = useState(0);
  const [weekNightDuration, setWeekNightDuration] = useState(0);

  // percentage of night
  const [averageDeepSleep, setAverageDeepSleep] = useState(0);
  const [monthDeepSleep, setMonthDeepSleep] = useState(0);
  const [weekDeepSleep, setWeekDeepSleep] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setAverageSleepHr(getAverageSleepHr(userData.sleep));
      setMonthAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 30)));
      setWeekAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 7)));

      setAverageTimeToBed(getAverageTimeToBed(userData.sleep));
      setMonthTimeToBed(getAverageTimeToBed(getLastDays(userData.sleep, 30)));
      setWeekTimeToBed(getAverageTimeToBed(getLastDays(userData.sleep, 7)));

      setAverageNightDuration(getAverageNightDuration(userData.sleep));
      setMonthNightDuration(
        getAverageNightDuration(getLastDays(userData.sleep, 30))
      );
      setWeekNightDuration(
        getAverageNightDuration(getLastDays(userData.sleep, 7))
      );

      setAverageDeepSleep(getAverageRelativeDeepSleep(userData.sleep));
      setMonthDeepSleep(
        getAverageRelativeDeepSleep(getLastDays(userData.sleep, 30))
      );
      setWeekDeepSleep(
        getAverageRelativeDeepSleep(getLastDays(userData.sleep, 7))
      );
    }
  }, [userData]);

  const getAverageSleepHr = (sleep) => {
    return getAverage(sleep.map((night) => night.data.hr_average));
  };

  const getAverageTimeToBed = (sleep) => {
    return getAverage(
      sleep.map((night) => {
        const date = new Date(night.startdate * 1000);
        let minutesInDay = date.getHours() * 60 + date.getMinutes();
        // you can't go to sleep after 10 in the morning
        if (minutesInDay < 60 * 10) {
          minutesInDay = minutesInDay =
            (date.getHours() + 24) * 60 + date.getMinutes();
        }
        return minutesInDay;
      })
    );
  };

  const getAverageNightDuration = (sleep) => {
    return getAverage(
      sleep.map((night) => {
        const startNight = new Date(night.startdate * 1000);
        const endNight = new Date(night.enddate * 1000);
        const nightDuration = endNight - startNight; // duration in miliseconds
        return nightDuration / (1000 * 60); // duration in minutes
      })
    );
  };

  const getAverageRelativeDeepSleep = (sleep) => {
    return getAverage(
      sleep.map((night) => {
        const deepSleepDuration = night.data.deepsleepduration;
        const startNight = new Date(night.startdate * 1000);
        const endNight = new Date(night.enddate * 1000);
        const nightDuration = (endNight - startNight) / 1000; // miliseconds --> seconds
        const relativeDeepSleep = (deepSleepDuration / nightDuration) * 100;
        return relativeDeepSleep;
      })
    );
  };

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
      your average HR during the nights is {Math.round(averageSleepHr)} bpm
      <br /> last month average HR during the nights is{" "}
      {Math.round(monthAverageHr)} bpm
      <br /> last week average HR during the nights is{" "}
      {Math.round(weekAverageHr)} bpm
      <hr />
      <hr />
      your average time to go to bed is{" "}
      {formatTimeFromMinutes(averageTimeToBed)}
      <br /> your average time to go to bed last month was{" "}
      {formatTimeFromMinutes(weekTimeToBed)}
      <br /> your average time to go to bed last week{" "}
      {formatTimeFromMinutes(monthTimeToBed)}
      <hr />
      <hr />
      <br />
      your average night duration is{" "}
      {formatTimeFromMinutes(averageNightDuration)}
      <br />
      your average night duration last month was{" "}
      {formatTimeFromMinutes(monthNightDuration)}
      <br />
      your average night duration last week was{" "}
      {formatTimeFromMinutes(weekNightDuration)}
      <hr />
      <hr />
      your average deep sleep is {Math.round(averageDeepSleep)}%
      <br /> your average deep sleep is {Math.round(monthDeepSleep)}%
      <br /> fyour average deep sleep is {Math.round(weekDeepSleep)}%
    </Section>
  );
}

export default SleepQuality;
