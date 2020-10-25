import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";
import getAverage from "../../lib/getAverage";
import getLastDays from "../../lib/getLastDays";

import LogoHeader from "../../components/LogoHeader";
import BarChart from "../../components/feed/BarChart";
import Compare from "../../components/feed/Compare";
import Learn from "../../components/feed/Learn";

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
  const location = useLocation();
  const history = useHistory();
  const props = location.state;

  // in bpm
  const [lastNightAverageHr, setLastNightAverageHr] = useState(0);
  const [weekAverageHr, setWeekAverageHr] = useState(0);
  const [monthAverageHr, setMonthAverageHr] = useState(0);
  const [averageSleepHr, setAverageSleepHr] = useState(0);

  const UNIT = "bpm";

  useEffect(() => {
    if (userData.sleep) {
      setAverageSleepHr(getAverageSleepHr(userData.sleep));
      setMonthAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 30)));
      setWeekAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 7)));
      setLastNightAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 1)));
    }
  }, [userData]);

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

  const articles = [
    {
      title: "Sleeping Heart Rate: Decoding The Clues To Long-Term Wellbeing",
      author: "Michelle Polizzi",
      url: "https://biostrap.com/blog/sleeping-heart-rate/",
      summary:
        "In certain cases, a lower resting heart rate can mean a higher degree of physical fitness, which is associated with reduced rates of cardiac events like heart attacks.",
    },
  ];

  const getAverageSleepHr = (sleep) => {
    return getAverage(sleep.map((night) => night.data.hr_average));
  };

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
        <Compare data={data} unit={UNIT} />
        <Learn articles={articles} />
      </Content>
    </Container>
  );
}

export default HeartRate;
