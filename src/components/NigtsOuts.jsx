import React, { useContext, useEffect, useState } from "react";
import { WithingsContext } from "../contexts/WithingsContext";
import getAverage from "../lib/getAverage";

import { Section } from "../styles/Section";
import { H2, SubTitle } from "../styles/Types";
import {} from "react";

function NightsOut() {
  const { userData } = useContext(WithingsContext);

  // in bpm
  const [averageSleepHr, setAverageSleepHr] = useState(0);
  const [barrierSleepHr, setBarrierSleepHr] = useState(0);

  // in minutes from start of the day
  const [averageTimeToBed, setAverageTimeToBed] = useState(0);
  const [barrierTimeToBed, setBarrierTimeToBed] = useState(0);

  // in minutes
  const [averageNightDuration, setAverageNightDuration] = useState(0);
  const [barrierNightDuration, setBarrierNightDuration] = useState(0);

  // percentage of night
  const [averageDeepSleep, setAverageDeepSleep] = useState(0);
  const [barrierDeepSleep, setBarrierDeepSleep] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setAverageSleepHr(
        getAverage(userData.sleep.map((night) => night.data.hr_average))
      );

      setAverageTimeToBed(
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

      setAverageNightDuration(
        getAverage(
          userData.sleep.map((night) => {
            const startNight = new Date(night.startdate * 1000);
            const endNight = new Date(night.enddate * 1000);
            const nightDuration = endNight - startNight; // duration in miliseconds
            return nightDuration / (1000 * 60); // duration in minutes
          })
        )
      );

      setAverageDeepSleep(
        getAverage(
          userData.sleep.map((night) => {
            const deepSleepDuration = night.data.deepsleepduration;
            const startNight = new Date(night.startdate * 1000);
            const endNight = new Date(night.enddate * 1000);
            const nightDuration = (endNight - startNight) / 1000; // miliseconds --> seconds
            const relativeDeepSleep = (deepSleepDuration / nightDuration) * 100;
            return relativeDeepSleep;
          })
        )
      );
    }
  }, [userData]);

  useEffect(() => {
    if (averageSleepHr !== 0) {
      setBarrierSleepHr(averageSleepHr * 1.08);
    }
  }, [averageSleepHr]);

  useEffect(() => {
    if (averageTimeToBed !== 0) {
      setBarrierTimeToBed(averageTimeToBed + 120);
    }
  }, [averageTimeToBed]);

  useEffect(() => {
    if (averageNightDuration !== 0) {
      setBarrierNightDuration(averageNightDuration - 90);
    }
  }, [averageNightDuration]);

  useEffect(() => {
    if (averageDeepSleep !== 0) {
      setBarrierDeepSleep(averageDeepSleep - 15);
    }
  }, [averageDeepSleep]);

  const formatTimeFromMinutes = (minutes) => {
    const hr = Math.floor((minutes / 60) % 24);
    const min = Math.round(((((minutes / 60) % 24) - hr) / 100) * 60 * 100);
    return `${hr}:${min < 10 ? `0${min}` : min}`;
  };

  console.log(userData.sleep && userData.sleep[0]);

  return (
    <Section>
      <H2>Drunk nights</H2>
      <SubTitle>
        By looking at your average heart raten and the time you went to bed we
        can guess if you went out or not
      </SubTitle>
      your average HR during the nights is {Math.round(averageSleepHr)}bpm
      <br />
      your average time to go to bed is{" "}
      {formatTimeFromMinutes(averageTimeToBed)}
      <br />
      your average night duration is{" "}
      {formatTimeFromMinutes(averageNightDuration)}
      <br />
      your average deep sleep is {Math.round(averageDeepSleep)}%
      <hr />
      <hr />
      you are concidered drunk when your average hr is bigger or equal then{" "}
      {Math.round(barrierSleepHr)}bpm
      <br />
      you went out if you fell asleep at:
      {formatTimeFromMinutes(barrierTimeToBed)}
      <br />
      you didn't sleep enough when you slept:{" "}
      {formatTimeFromMinutes(barrierNightDuration)}
      <br />
      you didn't have enough deep sleep if you had less than{" "}
      {Math.round(barrierDeepSleep)}%
    </Section>
  );
}

export default NightsOut;
