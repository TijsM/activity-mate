import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { WithingsContext } from "../contexts/WithingsContext";
import { getActivities, getSleep } from "../lib/fetchWithings";
import LogoHeader from "../components/LogoHeader";
import { H1 } from "../styles/Types";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-left: ${(props) => props.theme.spacing.margin};
  margin-right: ${(props) => props.theme.spacing.margin};
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
      <Content>

      </Content>
    </Container>
  );
}

export default Feed;
