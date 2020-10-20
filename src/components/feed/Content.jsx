import React  from "react";
import styled from "styled-components";
import HeartRateCard from './cards/HeartRate'
import SleepDurationCard from './cards/SleepDuration'

const Container = styled.div`
  margin-left: ${(props) => props.theme.spacing.margin};
  margin-right: ${(props) => props.theme.spacing.margin};
`;

function Content() {

  return (
    <Container>
      <HeartRateCard/>
      <SleepDurationCard/>
    </Container>
  );
}
export default Content;
