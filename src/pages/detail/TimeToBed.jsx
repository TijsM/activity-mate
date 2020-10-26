import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";
import getLastDays from "../../lib/getLastDays";
import getAverageTimeToBed from "../../lib/getAverageTimeToBed";

import LogoHeader from "../../components/LogoHeader";
import BarChart from "../../components/feed/BarChart";
import Compare from "../../components/feed/Compare";
import Learn from '../../components/feed/Learn'

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

  const articles = [
    {
      title: "Why being a night owl may lead to earlier death",
      author: " Brian Resnick",
      url:
        "https://www.vox.com/science-and-health/2018/4/16/17233860/night-owl-chronobiology-sleeping-late-health-risk",
      summary:
        "Imagine being jet-lagged every day. That’s what late sleepers feel. And it may be harming their health.",
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
          Going to bed late can have negative health effects,
          <Strong> try to go to bed on time</Strong>.
        </Context>
        <BarChart chartData={data} unit={UNIT} />
        <Compare data={data} unit={UNIT} />
        <Learn articles={articles}/>
      </Content>
    </Container>
  );
}

export default TimeToBed;
