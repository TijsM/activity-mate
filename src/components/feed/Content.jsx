import React  from "react";
import styled from "styled-components";
import HeartRateCard from './cards/HeartRate'
import SleepDurationCard from './cards/SleepDuration'
import Calories from './cards/Calories'
import DeepSleep from './cards/DeepSleep'


const Container = styled.div`
  margin-left: ${(props) => props.theme.spacing.margin};
  margin-right: ${(props) => props.theme.spacing.margin};
`;

function Content() {
  return (
    <Container>
      <HeartRateCard/>
      <Calories/>
      <SleepDurationCard/>
      <DeepSleep/>
    </Container>
  );
}
export default Content;
