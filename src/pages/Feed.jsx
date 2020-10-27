import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { WithingsContext } from "../contexts/WithingsContext";

import LogoHeader from "../components/LogoHeader";
import Content from "../components/feed/Content";
import SplashScreen from "../components/SplashScreen";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

function Feed() {
  const { userData } = useContext(WithingsContext);

  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  useEffect(() => {
    if (Object.keys(userData).length > 1) {
      setDataIsLoaded(true);
    }
  }, [userData]);

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
