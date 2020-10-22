import React  from "react";
import styled from "styled-components";

import HeartRateCard from './cards/HeartRate'
import SleepDurationCard from './cards/SleepDuration'
import Calories from './cards/Calories'
import DeepSleep from './cards/DeepSleep'
import TimeToBed from './cards/TimeToBed'
import Steps from './cards/Steps'


const Container = styled.div`
  margin-left: ${(props) => props.theme.spacing.margin};
  margin-right: ${(props) => props.theme.spacing.margin};
  margin-bottom: ${(props) => props.theme.spacing.bigMargin};
`;

function Content() {
  return (
    <Container>
      <HeartRateCard/>
      <Calories/>
      <SleepDurationCard/>
      <DeepSleep/>
      <Steps/>
      <TimeToBed/>
    </Container>
  );
}
export default Content;
