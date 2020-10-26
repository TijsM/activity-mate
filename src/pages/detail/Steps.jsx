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

function Steps() {
  const { userData } = useContext(WithingsContext);
  const location = useLocation();
  const history = useHistory();
  const props = location.state;

  // in kcal
  const [todaySteps, setTodaySteps] = useState(0);
  const [weekSteps, setWeekSteps] = useState(0);
  const [monthSteps, setMonthSteps] = useState(0);
  const [averageSteps, setAverageSteps] = useState(0);

  const UNIT = "steps";

  useEffect(() => {
    if (userData.dailyData) {
      setTodaySteps(getAverageSteps(getLastDays(userData.dailyData, 1)));
      setWeekSteps(getAverageSteps(getLastDays(userData.dailyData, 7)));
      setMonthSteps(getAverageSteps(getLastDays(userData.dailyData, 30)));
      setAverageSteps(getAverageSteps(userData.dailyData));
    }
  }, [userData]);

  const getAverageSteps = (activity) => {
    return getAverage(
      activity.map((day) => {
        return day.steps;
      })
    );
  };

  const data = [
    {
      label: "today",
      amount: todaySteps,
    },
    {
      label: "last week",
      amount: weekSteps,
    },
    {
      label: "last month",
      amount: monthSteps,
    },
    {
      label: "last year",
      amount: averageSteps,
    },
  ];

  const articles = [
    {
      title: "15 Health benefits of walking 10,000 steps a day",
      author: "Endurancely",
      url:
        "https://www.endurancely.com/benefits-of-walking/#11_Steps_to_a_Daily_Walking_Habit",
      summary:
        "Walking is something most people can do, regardless of their individual level of fitness. Regardless of whether someone has an active and physical lifestyle or whether the normal physical activity is a short trip from the couch to the refrigerator, increasing the amount of daily walking has significant benefits for both short and long term.",
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
          Consistently having a lot steps has many health benefits,
          <Strong> try to have as much steps as possible</Strong>.
        </Context>
        <BarChart chartData={data} unit={UNIT} />
        <Compare data={data} unit={UNIT} />
        <Learn articles={articles} />
      </Content>
    </Container>
  );
}

export default Steps;
