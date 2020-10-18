import React  from "react";
import styled from "styled-components";
import HeartRateCard from './cards/HeartRate'

const Container = styled.div`
  margin-left: ${(props) => props.theme.spacing.margin};
  margin-right: ${(props) => props.theme.spacing.margin};
`;

function Content() {

  return (
    <Container>
      <HeartRateCard/>
    </Container>
  );
}
export default Content;
