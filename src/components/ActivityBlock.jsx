import React from "react";
import styled from "styled-components";
import { H3 } from "../styles/Types";

const Container = styled.article`
  padding: 24px 0px;
  display: flex;
  flex-direction: column;
`;

const SubTitle = styled.span`
  text-align: left;
  font-style: italic;
  color: #4a4a4a;
`;

const Data = styled.div`
  margin-right: auto;
  font-size: 35px;
  margin-top: 24px;
`;

const Unit = styled.span`
  font-size: 12px;
`;

const NumberBlock = styled.span`
  margin: 8px;
`;

function ActivityBlock({ title, subTitle, shortTerm, longTerm }) {
  return (
    <Container>
      <H3>{title}</H3>
      <SubTitle>{subTitle}</SubTitle>
      <Data>
        <NumberBlock>
          {Math.round(shortTerm)} <Unit>Kcal</Unit>
        </NumberBlock>
        /
        <NumberBlock>
          {Math.round(longTerm)} <Unit>Kcal</Unit>
        </NumberBlock>
      </Data>
      <Data>{(((shortTerm - longTerm) / longTerm) * 100).toFixed(2)}%</Data>{" "}
    </Container>
  );
}

export default ActivityBlock;
