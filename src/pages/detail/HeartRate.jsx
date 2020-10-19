import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";
import getAverage from "../../lib/getAverage";
import getLastDays from "../../lib/getLastDays";

import LogoHeader from "../../components/LogoHeader";
import BarChart from "../../components/feed/BarChart";
import Compare from "../../components/feed/Compare";

import {
  Strong,
  Container,
  Content,
  Header,
  BackButton,
  Back,
  H1,
  Context,
} from "../../styles/Details";
import backImage from "../../assets/back.svg";

function HeartRate() {
  const { userData } = useContext(WithingsContext);

  // in bpm
  const [lastNightAverageHr, setLastNightAverageHr] = useState(0);
  const [weekAverageHr, setWeekAverageHr] = useState(0);
  const [monthAverageHr, setMonthAverageHr] = useState(0);
  const [averageSleepHr, setAverageSleepHr] = useState(0);

  const UNIT = 'bpm'

  useEffect(() => {
    if (userData.sleep) {
      setAverageSleepHr(getAverageSleepHr(userData.sleep));
      setMonthAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 30)));
      setWeekAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 7)));
      setLastNightAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 1)));
    }
  }, [userData]);

  const getAverageSleepHr = (sleep) => {
    return getAverage(sleep.map((night) => night.data.hr_average));
  };

  const location = useLocation();
  const history = useHistory();
  const props = location.state;

  const data = [
    {
      label: "last night",
      amount: lastNightAverageHr,
    },
    {
      label: "last week",
      amount: weekAverageHr,
    },
    {
      label: "last month",
      amount: monthAverageHr,
    },
    {
      label: "last year",
      amount: averageSleepHr,
    },
  ];

  return (
    <Container>
      <LogoHeader />
      <Content>
        <Header>
          <BackButton onClick={history.goBack}>
            <Back src={backImage} alt="back button" />
          </BackButton>
          <H1>{props.title}</H1>
        </Header>
        <Context>
          Having a low heart rate during the night means that you are resting.
          <Strong> The lower your heart rate, the better</Strong>
        </Context>
        <BarChart chartData={data} unit={UNIT} />
        <Compare data={data} unit={UNIT}/>
      </Content>
    </Container>
  );
}

export default HeartRate;
