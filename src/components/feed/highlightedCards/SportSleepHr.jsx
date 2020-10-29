import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { WithingsContext } from "../../../contexts/WithingsContext";

import getAverage from "../../../lib/getAverage";
import { getYesterday } from "../../../lib/getWithingsDate";

import BarChart from "../BarChart";

import { CardHighlight } from "../../../styles/Card";
import { CardTitle, Context, Container } from "../../../styles/HighlightedCard";

function HighlightCard() {
  const { userData } = useContext(WithingsContext);

  const [nightsWithSport, setNightsWithSport] = useState();
  const [nights, setNights] = useState();
  const [chartData, setChartData] = useState([
    {
      label: "with sport",
      amount: 10,
    },
    {
      label: "without sport",
      amount: 0,
    },
  ]);

  useEffect(() => {
    if (userData.sleep) {
      setNights(
        userData.sleep.map((night) => {
          return {
            ...night,
            date: getYesterday(night.date),
          };
        })
      );
    }
  }, [userData]);

  useEffect(() => {
    if (nights && userData.workouts) {
      const nightsWithSport = userData.workouts.map((workout) => {
        return workout.date;
      });

      setNightsWithSport(getNightsByDates(nightsWithSport, nights));
    }
  }, [userData, nights]);

  useEffect(() => {
    if (nightsWithSport && nights) {
      setChartData([
        {
          label: "with sport",
          amount: Math.round(getAverage(getSleepHr(nightsWithSport))),
        },
        {
          label: "without sport",
          amount: Math.round(getAverage(getSleepHr(nights))),
        },
      ]);
    }
  }, [nights, nightsWithSport]);

  const getNightsByDates = (dates, nights) => {
    return dates
      .map((sportNight) => {
        return nights.find((nightObject) => {
          return nightObject.date === sportNight;
        });
      })
      .filter(Boolean);
  };

  const getSleepHr = (nights) => {
    return nights.map((night) => night.data.hr_average);
  };

  return (
    <Container>
      <CardTitle>Impact of sporting on your sleep</CardTitle>
      {nightsWithSport && (
        <Context>
          Your average heart rate on a night where you had a
          sportsession was
          <CardHighlight>
            {Math.round(getAverage(getSleepHr(nightsWithSport)))} bpm
          </CardHighlight>
          . Your average Wheart rate when you didn't have a sport
          sessio was{" "}
          <CardHighlight>
            {Math.round(getAverage(getSleepHr(nights)))} bpm
          </CardHighlight>
          .
        </Context>
      )}
      <BarChart chartData={chartData} unit={" "} hideShadow={true} />
    </Container>
  );
}

export default HighlightCard;
