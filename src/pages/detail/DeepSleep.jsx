import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";
import getLastDays from "../../lib/getLastDays";
import getAverageRelativeDeepSleep from "../../lib/getAverageRelativeDeepSleep";

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

  const articles = [
    {
      title: "What Is REM Sleep?",
      author: "Mark Stibich, PhD",
      url: "https://www.verywellmind.com/understanding-dreams-2224258",
      summary:
        "Rapid eye movement (REM) sleep is one of the four stages that the brain goes through during the sleep cycle. This period of the sleep cycle usually takes place about 90 minutes after a person first falls asleep. It is marked by a number of physiological changes that include muscle relaxation, eye movement, faster respiration, and increased brain activity.",
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
          The quality of a night can be measured by it's deep sleep or REM sleep,
          <Strong> the more deep sleep, the better</Strong>.
        </Context>
        <BarChart chartData={data} unit={UNIT} />
        <Compare data={data} unit={UNIT} />
        <Learn articles={articles}/>
      </Content>
    </Container>
  );
}

export default DeepSleep;
