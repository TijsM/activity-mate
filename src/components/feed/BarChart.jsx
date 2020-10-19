import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.article`
  box-shadow: 0px 4px 16px rgba(200, 200, 200, 0.18);
  border-radius: ${(props) => props.theme.radius.card};
  padding: ${(props) => props.theme.spacing.padding};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 4fr;
  margin: 5px 0px;
  align-items: center;
`;

const Label = styled.span`
  font-size: 10px;
  word-spacing: 60px;
`;
const Data = styled.span`
  font-size: 10px;
  font-weight: bold;
`;
const Bar = styled.div`
  width: ${(props) => props.value}%;
  height: 35px;
  background-color: ${(props) => props.theme.colors.green};
  border-radius: 35px;
`;

function BarChart({ chartData, unit, relativeDevideValue }) {
  const [data, setData] = useState(chartData);

  useEffect(() => {
    setData(chartData);
  }, [chartData]);

  const getRelativeAmount = (amount) => {
    const max = Math.round(
      Math.max.apply(
        Math,
        data.map((row) => row.amount)
      )
    );

    const min = Math.round(
      Math.min.apply(
        Math,
        data.map((row) => row.amount)
      )
    );

    const subtractValue = min - min * 0.2;
    console.log("sub value", subtractValue);

    const res = ((amount - subtractValue) / (max - subtractValue)) * 100;
    console.log("res", res);
    return res;
  };

  return (
    <Container>
      {data &&
        data[0].amount !== 0 &&
        data.map((row, i) => {
          return (
            <Row key={i}>
              <Label>{row.label}</Label>
              <Data>
                {Math.round(row.amount)}
                {unit}
              </Data>
              <Bar value={getRelativeAmount(row.amount)} />
            </Row>
          );
        })}
    </Container>
  );
}

export default BarChart;
