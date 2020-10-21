import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import formatTimeFromMinutes from "../../lib/formatTimeFromMinutes";

const Container = styled.article`
  box-shadow: ${(props) => props.theme.shadow.card};
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
const P = styled.p`
  margin: 0px;
`;

function BarChart({ chartData, unit, relativeDevideValue }) {
  const [data, setData] = useState(chartData);

  useEffect(() => {
    setData(chartData);
  }, [chartData]);

  const formatValue = (value) => {
    if (unit === "minutes") {
      return formatTimeFromMinutes(value, "u ");
    } else return Math.round(value) + " " + unit;
  };

  const getRelativeAmount = (amount) => {
    amount = Math.round(amount);
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

    // making sure the smallest bar is half the length
    const subtractValue = min - (max - min);
    return ((amount - subtractValue) / (max - subtractValue)) * 100;
  };

  return (
    <Container>
      {data &&
        data[1].amount !== 0 &&
        data.map((row, i) => {
          return (
            <Row key={i}>
              <Label>
                {row.label.split(" ").map((word, index) => (
                  <P key={index}>{word}</P>
                ))}
              </Label>
              <Data>{formatValue(row.amount)}</Data>
              <Bar value={getRelativeAmount(row.amount)} />
            </Row>
          );
        })}
    </Container>
  );
}

export default BarChart;
