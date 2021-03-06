import React, { useContext, useState, useEffect } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";

import getAverage from "../../../lib/getAverage";
import { getDayAfterDate } from "../../../lib/getWithingsDate";

import BarChart from "../BarChart";

import { CardHighlight } from "../../../styles/Card";
import { CardTitle, Context, Container } from "../../../styles/HighlightedCard";

function HighlightCard() {
  const { userData } = useContext(WithingsContext);

  const [nightsWithSport, setNightsWithSport] = useState();
  const [nightsWithoutSport, setNightsWithoutSleep] = useState();

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
            date: getDayAfterDate(night), // gets the next night --> the nights after a sport session
          };
        })
      );
    }
  }, [userData]);

  useEffect(() => {
    if (nights && userData.workouts && userData.sleep) {
      const allDates = userData.sleep.map((n) => n.date);

      const nightsWithSport = userData.workouts.map((workout) => {
        return workout.date;
      });

      const nightsWithoutSport = allDates.filter(
        (date) => !nightsWithSport.includes(date)
      );

      setNightsWithSport(getNightsByDates(nightsWithSport, nights));
      setNightsWithoutSleep(getNightsByDates(nightsWithoutSport, nights));
    }
  }, [userData, nights]);

  useEffect(() => {
    if (nightsWithSport && nights) {
      setChartData([
        {
          label: "with sport",
          amount: Math.round(getAverage(getSleepScores(nightsWithSport))),
        },
        {
          label: "without sport",
          amount: Math.round(getAverage(getSleepScores(nightsWithoutSport))),
        },
      ]);
    }
  }, [nights, nightsWithSport, nightsWithoutSport]);

  const getNightsByDates = (dates, nights) => {
    return dates
      .map((sportNight) => {
        return nights.find((nightObject) => {
          return nightObject.date === sportNight;
        });
      })
      .filter(Boolean);
  };

  const getSleepScores = (nights) => {
    return nights.map((night) => night.data.sleep_score);
  };

  return (
    <Container>
      <CardTitle>Impact of sporting on your sleep</CardTitle>
      {nightsWithSport && (
        <Context>
          Your average Withings sleep score on a day where you had a
          sportsession was{" "}
          <CardHighlight>
            {Math.round(getAverage(getSleepScores(nightsWithSport)))}
          </CardHighlight>
          . Your average Withings sleep score when you didn't have a sport
          sessio was{" "}
          <CardHighlight>
            {Math.round(getAverage(getSleepScores(nightsWithoutSport)))}
          </CardHighlight>
          .
        </Context>
      )}
      <BarChart chartData={chartData} unit={" "} hideShadow={true} />
    </Container>
  );
}

export default HighlightCard;
