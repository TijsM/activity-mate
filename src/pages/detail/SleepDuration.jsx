import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";

import getLastDays from "../../lib/getLastDays";
import getAverageNightDuration from "../../lib/getAverageNightDuration";

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

  const articles = [
    {
      title: "How Much Sleep Do We Really Need?",
      author: "Eric Suni | Dr. Abhinav Singh",
      url:
        "https://www.sleepfoundation.org/articles/how-much-sleep-do-we-really-need",
      summary:
        "Scientific research makes clear that sleep is essential at any age. Sleep powers the mind, restores the body, and fortifies virtually every system in the body. But how much sleep do we really need in order to get these benefits? National Sleep Foundation guidelines1 advise that healthy adults need between 7 and 9 hours of sleep per night. Babies, young children, and teens need even more sleep to enable their growth and development. People over 65 should also get 7 to 8 hours per night.",
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
          According to scientific research an adult persion needs between
          <Strong> 7 and 9 hours of sleep a night</Strong>.
        </Context>
        <BarChart chartData={data} unit={"minutes"} />
        <Compare data={data} unit={"minutes"} />
        <Learn articles={articles}/>
      </Content>
    </Container>
  );
}

export default SleepDuration;
