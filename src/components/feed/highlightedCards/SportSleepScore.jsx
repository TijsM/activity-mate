import React, { useContext, useState, useEffect } from "react";
import { WithingsContext } from "../../../contexts/WithingsContext";

import getAverage from "../../../lib/getAverage";
import { getDayBeforeDate } from "../../../lib/getWithingsDate";

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
            date: getDayBeforeDate(night),
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
          amount: Math.round(getAverage(getSleepScores(nightsWithSport))),
        },
        {
          label: "without sport",
          amount: Math.round(getAverage(getSleepScores(nights))),
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
            {Math.round(getAverage(getSleepScores(nights)))}
          </CardHighlight>
          .
        </Context>
      )}
      <BarChart chartData={chartData} unit={" "} hideShadow={true} />
    </Container>
  );
}

export default HighlightCard;
