import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";
import getLastDays from "../../lib/getLastDays";
import getAverageRelativeDeepSleep from "../../lib/getAverageRelativeDeepSleep";

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

function DeepSleep() {
  const { userData } = useContext(WithingsContext);
  const location = useLocation();
  const history = useHistory();
  const props = location.state;

  const [lastNightDeepSleep, setLastNightDeepSleep] = useState(0);
  const [lastWeekDeepSleep, setLastWeekDeepSleep] = useState(0);
  const [lastMonthDeepSleep, setLastMonthDeepSleep] = useState(0);
  const [averageDeepSleep, setAverageDeepSleep] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setLastNightDeepSleep(
        getAverageRelativeDeepSleep(getLastDays(userData.sleep, 1))
      );
      setLastWeekDeepSleep(
        getAverageRelativeDeepSleep(getLastDays(userData.sleep, 7))
      );
      setLastMonthDeepSleep(
        getAverageRelativeDeepSleep(getLastDays(userData.sleep, 30))
      );
      setAverageDeepSleep(getAverageRelativeDeepSleep(userData.sleep));
    }
  }, [userData]);

  const UNIT = "%";

  const data = [
    {
      label: "last night",
      amount: lastNightDeepSleep,
    },
    {
      label: "last week",
      amount: lastWeekDeepSleep,
    },
    {
      label: "last month",
      amount: lastMonthDeepSleep,
    },
    {
      label: "last year",
      amount: averageDeepSleep,
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

export default DeepSleep;
