import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";
import getLastDays from "../../lib/getLastDays";
import getAverageTimeToBed from "../../lib/getAverageTimeToBed";

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

function TimeToBed() {
  const { userData } = useContext(WithingsContext);
  const location = useLocation();
  const history = useHistory();
  const props = location.state;

  // in minutes
  const [lastNightTTB, setLastNightTTB] = useState(0);
  const [lastWeekTTB, setLastWeekTTB] = useState(0);
  const [lastMonthTTB, setLastMonthTTB] = useState(0);
  const [averageTTB, setAverageTTB] = useState(0);

  const UNIT = "minutes";

  useEffect(() => {
    if (userData.sleep) {
      setLastNightTTB(getAverageTimeToBed(getLastDays(userData.sleep, 1)));
      setLastWeekTTB(getAverageTimeToBed(getLastDays(userData.sleep, 7)));
      setLastMonthTTB(getAverageTimeToBed(getLastDays(userData.sleep, 30)));
      setAverageTTB(getAverageTimeToBed(userData.sleep, 1));
    }
  }, [userData]);

  const data = [
    {
      label: "last night",
      amount: lastNightTTB,
    },
    {
      label: "last week",
      amount: lastWeekTTB,
    },
    {
      label: "last month",
      amount: lastMonthTTB,
    },
    {
      label: "last year",
      amount: averageTTB,
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
        <BarChart chartData={data} unit={UNIT} />
        <Compare data={data} unit={UNIT} />
      </Content>
    </Container>
  );
}

export default TimeToBed;
