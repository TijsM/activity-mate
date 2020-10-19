import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";
import getAverage from "../../lib/getAverage";
import getLastDays from "../../lib/getLastDays";

import LogoHeader from "../../components/LogoHeader";
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

  console.log(userData)
  // in bpm
  const [averageSleepHr, setAverageSleepHr] = useState(0);
  const [monthAverageHr, setMonthAverageHr] = useState(0);
  const [weekAverageHr, setWeekAverageHr] = useState(0);
  const [lastNightAverageHr, setLastNightAverageHr] = useState(0);

  useEffect(() => {
    if (userData.sleep) {
      setAverageSleepHr(getAverageSleepHr(userData.sleep));
      setMonthAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 30)));
      setWeekAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 7)));
      setLastNightAverageHr(getAverageSleepHr(getLastDays(userData.sleep, 1)));
    }
  }, [userData]);

  const getAverageSleepHr = (sleep) => {
    return getAverage(sleep.map((night) => night.data.hr_average));
  };

  const location = useLocation();
  const history = useHistory();
  const props = location.state;

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

        {lastNightAverageHr} bpm
        {weekAverageHr} bpm
        {monthAverageHr} bpm
        {averageSleepHr} bpm
      </Content>
    </Container>
  );
}

export default HeartRate;
