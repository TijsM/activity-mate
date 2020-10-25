import React from "react";
import styled from "styled-components";

import {
  Card as DefaultCard,
  CardIndicator,
  CardTitle,
} from "../../styles/Card";
import ChevronImage from "../../assets/chevron.svg";

const Card = styled(DefaultCard)`
  cursor: unset;
`;

const CardHeader = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
`;

const Title = styled(CardTitle)`
  font-size: 28px;
`;

const Summary = styled.p`
  font-size: 14px;
  line-height: 16px;
  font-style: italic;
`;

const Link = styled.a`
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;
  color: ${(props) => props.theme.colors.textGrey};
`;

const Chevron = styled.img``;

function LearnCard({ article }) {
  const getCleanUrl = (url) => {
    const splitted = url.split("/");
    return splitted[2];
  };
  return (
    <Card activity="Learn">
      <CardHeader>
        <div>
          <CardIndicator>{article.author}</CardIndicator>
          <Title>{article.title}</Title>
        </div>
        <Chevron src={ChevronImage} />
      </CardHeader>
      <Summary>"{article.summary}"</Summary>
      <Link href={article.url} target="_blank">
        Read the full article on {getCleanUrl(article.url)}
      </Link>
    </Card>
  );
}

export default LearnCard;
