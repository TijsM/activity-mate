import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";
import getAverage from "../../lib/getAverage";
import getLastDays, {getByDate} from "../../lib/getLastDays";
import { getYesterday } from "../../lib/getWithingsDate";

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
      </Content>
    </Container>
  );
}

export default Calories;
