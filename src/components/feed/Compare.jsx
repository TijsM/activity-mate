import React from "react";
import styled from "styled-components";

import { H1 } from "../../styles/Details";
import CompareBlock from "./CompareBlock";

const Container = styled.section`
  margin-top: ${(props) => props.theme.spacing.bigMargin};
`;

function Compare({ data, unit }) {
  return (
    <Container>
      <H1>Compare</H1>
      {data.map((row, i, arr) => {
        if (i >= arr.length - 2) {
          return (
            <CompareBlock
              key={i}
              title="yikes"
              val1={arr[i]}
              label1="yikes"
              val2={arr[i + 1]}
              label2="yikes"
              unit={unit}
            />
          );
        }
        return null
      })}
    </Container>
  );
}

export default Compare;
