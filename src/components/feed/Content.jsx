import React from "react";
import styled from "styled-components";
import FeedCard from "./Card";

const Container = styled.div`
  margin-left: ${(props) => props.theme.spacing.margin};
  margin-right: ${(props) => props.theme.spacing.margin};
`;

function Content() {
  return (
    <Container>
      <FeedCard
        activity="Sleep"
        title="Heart rate by night"
        context="Your average heart rate is"
        highlight="58 BPM"
        change="-14%"
      />
    </Container>
  );
}
export default Content;
