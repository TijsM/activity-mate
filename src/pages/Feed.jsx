import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { WithingsContext } from "../contexts/WithingsContext";
import { getActivities, getSleep } from "../lib/fetchWithings";
import LogoHeader from "../components/LogoHeader";
import Content from "../components/feed/Content";


const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

function Feed() {
  const { setUserData } = useContext(WithingsContext);

  useEffect(() => {
    const fetchData = async () => {
      const activities = await getActivities();
      const sleep = await getSleep();
      setUserData({ dailyData: activities, sleep });
    };

    fetchData();
  }, [setUserData]);

  return (
    <Container>
      <LogoHeader />
      <Content/>
    </Container>
  );
}

export default Feed;
