import React from "react";
import styled from "styled-components";

import useSplashScreen from "../hooks/useSplashScreen";

import LogoHeader from "../components/LogoHeader";
import Content from "../components/feed/Content";
import SplashScreen from "../components/SplashScreen";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 500px;
`;

function Feed() {
  const dataIsLoaded = useSplashScreen();

  return dataIsLoaded ? (
    <Container>
      <LogoHeader />
      <Content />
    </Container>
  ) : (
    <SplashScreen />
  );
}

export default Feed;
