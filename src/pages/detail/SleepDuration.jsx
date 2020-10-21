import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";

import getLastDays from "../../lib/getLastDays";
import getAverageNightDuration from "../../lib/getAverageNightDuration";

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

function SleepDuration() {
  const { userData } = useContext(WithingsContext);
  const location = useLocation();
  const history = useHistory();
  const props = location.state;

  // in minutes
  const [lastNightNightDuration, setLastNightDuration] = useState(0);
  const [weekNightDuration, setWeekNightDuration] = useState(0);
  const [monthNightDuration, setMonthNightDuration] = useState(0);
  const [averageNightDuration, setAverageNightDuration] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setLastNightDuration(getAverageNightDuration(userData.sleep, 1));
      setAverageNightDuration(getAverageNightDuration(userData.sleep));
      setMonthNightDuration(
        getAverageNightDuration(getLastDays(userData.sleep, 30))
      );
      setWeekNightDuration(
        getAverageNightDuration(getLastDays(userData.sleep, 7))
      );
    }
  }, [userData.sleep]);

  const data = [
    {
      label: "last night",
      amount: lastNightNightDuration,
    },
    {
      label: "last week",
      amount: weekNightDuration,
    },
    {
      label: "last month",
      amount: monthNightDuration,
    },
    {
      label: "last year",
      amount: averageNightDuration,
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
          TODOOOOOOO
          <Strong> TODOOOOOOOO</Strong>
        </Context>
        <BarChart chartData={data} unit={"minutes"} />
        <Compare data={data} unit={"minutes"} />
      </Content>
    </Container>
  );
}

export default SleepDuration;
