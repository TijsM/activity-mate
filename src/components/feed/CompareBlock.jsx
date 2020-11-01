import React from "react";
import styled from "styled-components";
import formatTimeFromMinutes from '../../lib/formatTimeFromMinutes'

const Container = styled.article`
  margin-top: ${(props) => props.theme.spacing.margin};
  border-left: 2px solid ${(props) => props.theme.colors.superLightGrey};
  padding: ${(props) => props.theme.spacing.padding};
  box-sizing: border-box;
`;
const H2 = styled.h2`
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
`;
const DataBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const Data = styled.div`
  display: flex;
  flex-direction: column;
  text-align: ${(props) => props.right && "right"};
`;
const Amount = styled.span`
  font-size: 24px;
  line-height: 27px;
`;
const Label = styled.span`
  font-size: 10px;
  line-height: 14px;
`;
const Dif = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  color: ${(props) => props.theme.colors.lightGrey};
`;

function CompareBlock({ title, val1, label1, val2, label2, unit }) {

  val1 = Math.round(val1);
  val2 = Math.round(val2);

  const getDif = (val1, val2) => {
    if (!val1 || !val2) {
      return "";
    }

    const dif = Math.round(((val1 - val2) / val2) * 100);
    return dif > 0 ? `(-${dif}%)` : `(${dif}%)`;
  };

  const formatValue = (value) => {
    if(unit === "minutes"){
      return formatTimeFromMinutes(value, 'u ')
    }
    else return value + ' ' + unit
  }

  return (
    <Container>
      <H2>{title}</H2>
      <DataBlock>
        <Data>
          <Amount>
            {formatValue(val1)}
          </Amount>
          <Label>{label1}</Label>
        </Data>
        <Dif>
          <div>{getDif(val1, val2)}</div>
        </Dif>
        <Data right={true}>
          <Amount>
            {(formatValue(val2))}
          </Amount>
          <Label>{label2}</Label>
        </Data>
      </DataBlock>
    </Container>
  );
}

export default CompareBlock;
