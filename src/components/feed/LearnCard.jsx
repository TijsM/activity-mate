import React from "react";
import styled from "styled-components";

import {
  Card as DefaultCard,
  CardIndicator,
  CardTitle,
} from "../../styles/Card";
import ChevronImage from "../../assets/chevron.svg";
import { useState } from "react";

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
  margin-bottom: 0px;
`;

const Details = styled.div`
  transition-delay: 0.2s;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(.75,0,.25,1.01);
  opacity: ${(props) => (props.show ? 1 : 0)};
  max-height: ${(props) => (props.show ? "200px" : "0px")};
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

const Chevron = styled.img`
  cursor: pointer;
  transition: transform 0.5s;
  transform: ${(props) => (props.show ? "rotate(0deg)" : "rotate(180deg)")};
`;

function LearnCard({ article }) {
  const [showDetails, setShowDetails] = useState(false);

  const getCleanUrl = (url) => {
    const splitted = url.split("/");
    return splitted[2];
  };

  console.log(showDetails);

  return (
    <Card activity="Learn">
      <CardHeader>
        <div>
          <CardIndicator>{article.author}</CardIndicator>
          <Title>{article.title}</Title>
        </div>
        <Chevron
          show={showDetails}
          src={ChevronImage}
          onClick={() => setShowDetails(!showDetails)}
        />
      </CardHeader>
      <Details show={showDetails}>
        <Summary>"{article.summary}"</Summary>
        <Link href={article.url} target="_blank">
          Read the full article on {getCleanUrl(article.url)}
        </Link>
      </Details>
    </Card>
  );
}

export default LearnCard;
