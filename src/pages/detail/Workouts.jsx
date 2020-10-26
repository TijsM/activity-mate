import React, { useContext, useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { WithingsContext } from "../../contexts/WithingsContext";
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

function Workouts() {
  const { userData } = useContext(WithingsContext);
  const location = useLocation();
  const history = useHistory();
  const props = location.state;

  const [weekWorkouts, setWeekWorkouts] = useState(0);
  const [averageMonthWorkouts, setAverageMonthWorkouts] = useState(0);
  const [averageWorkouts, setAverageWorkouts] = useState(0);

  const UNIT = "/week";

  useEffect(() => {
    if (userData.workouts) {
      setWeekWorkouts(getAmountOfWorkouts(userData.workouts, 7));
      setAverageMonthWorkouts(getAmountOfWorkouts(userData.workouts, 30));
      setAverageWorkouts(getAmountOfWorkouts(userData.workouts, 365));
    }
  }, [userData]);

  const getAmountOfWorkouts = (workouts, amount) => {
    const selectedWorkouts = getLastDays(workouts, amount);
    console.log(selectedWorkouts.length);
    return (selectedWorkouts.length / amount) * 7;
  };

  const data = [
    {
      label: "this week",
      amount: weekWorkouts,
    },
    {
      label: "last month",
      amount: averageMonthWorkouts,
    },
    {
      label: "last year",
      amount: averageWorkouts,
    },
  ];

  const articles = [
    {
      title: "The role of physical activity and sport in mental health",
      author: "Dr Nick Peirce | Dr Catherine Lester",
      url:
        "https://www.fsem.ac.uk/position_statement/the-role-of-physical-activity-and-sport-in-mental-health/#:~:text=Physical%20activity%20has%20been%20shown,and%20reduce%20stress%20and%20anxiety.",
      summary:
        "Physical activity has been shown to have a strong and positive influence on mental wellbeing and some mental illnesses. Participation in regular physical activity can increase self-esteem and reduce stress and anxiety.",
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
          Physical activity and sport in general can improve your
          <Strong> mental health</Strong>. The more sportsessions you can have
          in a week, the better.
        </Context>
        <BarChart chartData={data} unit={UNIT} />
        <Compare data={data} unit={UNIT} />
        <Learn articles={articles} />
      </Content>
    </Container>
  );
}

export default Workouts;
