import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";
import getAverage from "../../lib/getAverage";
import getLastDays, {getByDate} from "../../lib/getLastDays";
import { getYesterday } from "../../lib/getWithingsDate";

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

function Calories() {
  const { userData } = useContext(WithingsContext);
  const location = useLocation();
  const history = useHistory();
  const props = location.state;

  // in kcal
  const [yesterdayKcal, setYesterdayKcal] = useState(0);
  const [weekKcal, setWeekKcal] = useState(0);
  const [monthKcal, setMonthKcal] = useState(0);
  const [averageKcal, setAverageKcal] = useState(0);

  const UNIT = "kcal";

  useEffect(() => {
    if (userData.dailyData) {
      setYesterdayKcal(getByDate(userData.dailyData, getYesterday()).calories);
      setWeekKcal(getAverageKcal(getLastDays(userData.dailyData, 7)));
      setMonthKcal(getAverageKcal(getLastDays(userData.dailyData, 30)));
      setAverageKcal(getAverageKcal(userData.dailyData));
    }
  }, [userData]);

  const getAverageKcal = (activity) => {
      return getAverage(activity.map(day => {
          return day.calories
      }))
  };

  const data = [
    {
      label: "yesterday",
      amount: yesterdayKcal,
    },
    {
      label: "last week",
      amount: weekKcal,
    },
    {
      label: "last month",
      amount: monthKcal,
    },
    {
      label: "last year",
      amount: averageKcal,
    },
  ];

  const articles = [
    {
      title: "5 Things to Know about Burning More Calories",
      author: "Riikka Lamminen",
      url: "https://www.firstbeat.com/en/blog/5-things-to-know-about-burning-more-calories/",
      summary:
        "Eager to lose weight? Often it is said that it is easier to cut back on calories than to increase energy expenditure with exercise. There’s some truth to this.",
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
          If you want to loose weight, you have to
          <Strong> burn as much calories as possible</Strong> in a day.
        </Context>
        <BarChart chartData={data} unit={UNIT} />
        <Compare data={data} unit={UNIT} />
        <Learn articles={articles}/>
      </Content>
    </Container>
  );
}

export default Calories;
