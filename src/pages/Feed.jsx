import React from "react";
import styled from "styled-components";

import LogoHeader from "../components/LogoHeader";
import Content from "../components/feed/Content";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

function Feed() {
  return (
    <Container>
      <LogoHeader />
      <Content />
    </Container>
  );
}

export default Feed;
