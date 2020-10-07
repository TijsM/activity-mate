import React from "react";
import styled from "styled-components";

const Container = styled.article`
  padding: 24px 16px;
`;

function ActivityBlock({ title, subTitle, shortTerm, longTerm}) {
    console.log("typefo", typeof shortTerm)
  return (
    <Container>
      <strong>{title}</strong>
      <p>{subTitle}</p>
      <div>
        {Math.round(shortTerm)} / {Math.round(longTerm)}
      </div>
    </Container>
  );
}

export default ActivityBlock;
