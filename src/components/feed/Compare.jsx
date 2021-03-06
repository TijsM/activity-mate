import React, {useEffect} from "react";
import styled from "styled-components";

import { H1 } from "../../styles/Details";
import CompareBlock from "./CompareBlock";
import { useState } from "react";

const Container = styled.section`
  margin: ${(props) => props.theme.spacing.bigMargin} 0px;
`;

function Compare({ data, unit }) {
  const [compareData, setCompareData] = useState(data)

  useEffect(() => {
    setCompareData(data)
  }, [data, setCompareData])

  const titles = ["Short term", "Medium term", "Long term"]
  const subLables = data.map(block => block.label)

  return (
    <Container>
      <H1>Compare</H1>
      {compareData.map((row, i, arr) => {
        if (i <= arr.length - 2) {
          return (
            <CompareBlock
              key={i}
              title={titles[i]}
              val1={arr[i].amount}
              label1={subLables[i]}
              val2={arr[i+1].amount}
              label2={subLables[i+1]}
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
