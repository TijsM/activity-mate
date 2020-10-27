import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { WithingsContext } from "../../../contexts/WithingsContext";

import getLastWorkouts from "../../../lib/getLastWorkouts";
import getAverage from "../../../lib/getAverage";

import BarChart from "../BarChart";
import { CardTitle as defTitle } from "../../../styles/Card";

const Container = styled.section`
  margin: ${(props) => props.theme.spacing.bigMargin} 0px;
`;

const CardTitle = styled(defTitle)`
  color: ${(props) => props.theme.colors.black};
`;

function Run() {
  const { userData } = useContext(WithingsContext);

  const [lastRun, setLastRun] = useState();
  const [last5Runs, setLast5Runs] = useState();
  const [last15Runs, setLast15Runs] = useState();
  const [allRuns, setAllRuns] = useState();

  const [displayData, setDisplayData] = useState();

  useEffect(() => {
    if (userData.workouts) {
      setLastRun(getRuns(userData.workouts, 1));
      setLast5Runs(getRuns(userData.workouts, 5));
      setLast15Runs(getRuns(userData.workouts, 15));
      setAllRuns(getRuns(userData.workouts, 400));
    }
  }, [userData]);

  useEffect(() => {
    if ((allRuns, lastRun, last5Runs, last15Runs)) {
      console.log("lastrun", lastRun);
      setDisplayData([
        {
          label: "last run",
          amount: getAverage(lastRun?.map((run) => run?.data?.distance)) / 1000,
        },
        {
          label: "last 5 runs",
          amount:
            getAverage(last5Runs?.map((run) => run?.data?.distance)) / 1000,
        },
        {
          label: "last 15 runs ",
          amount:
            getAverage(last15Runs?.map((run) => run?.data?.distance)) / 1000,
        },
        {
          label: "last year runs",
          amount: getAverage(allRuns?.map((run) => run?.data?.distance)) / 1000,
        },
      ]);
    }
  }, [allRuns, last15Runs, last5Runs, lastRun]);

  const getRuns = (workouts, amount) => {
    const runs = workouts.filter((workout) => workout.category === 2);
    return getLastWorkouts(runs, amount);
  };

  console.log("display", displayData);

  return (
    <Container>
      <CardTitle>Run pace </CardTitle>
      {displayData && <BarChart chartData={displayData} unit={"km"} />}
    </Container>
  );
}

export default Run;
