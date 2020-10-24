import React, { useEffect } from "react";
import styled from "styled-components";

import { H1 } from "../../styles/Details";
import { useState } from "react";

const Container = styled.section`
  margin: ${(props) => props.theme.spacing.bigMargin} 0px;
`;

function Learn({ data }) {
  const [learnData, setLearnData] = useState(data);

  useEffect(() => {
    setLearnData(data);
  }, [data, learnData]);
  return (
    <Container>
      <H1>Learn</H1>
      <LearnCard>
          
      </LearnCard>
    </Container>
  );
}

export default Learn