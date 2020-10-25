import React from "react";
import styled from "styled-components";
import LearnCard from "./LearnCard";
import { H1 } from "../../styles/Details";

const Container = styled.section`
  margin: ${(props) => props.theme.spacing.bigMargin} 0px;
`;

function Learn({ articles }) {
  console.log("articles", articles);
  return (
    <Container>
      <H1>Learn</H1>
      {articles.map((article, i) => (
        <LearnCard key={i} article={article} />
      ))}
    </Container>
  );
}

export default Learn;
