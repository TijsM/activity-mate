import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardIndicator,
  CardHighlight,
  CardTitle,
  CardRelChange,
  Context,
} from "../../styles/Card";

function FeedCard(props) {
  const history = useHistory();

  return (
    <Card
      onClick={() => {
        history.push({
          pathname: "/detail",
          state: { ...props },
        });
      }}
    >
      <CardIndicator>{props.activity}</CardIndicator>
      <CardTitle>{props.title}</CardTitle>
      <Context>
        {props.context} <br /> <CardHighlight>{props.highlight}</CardHighlight>{" "}
        <CardRelChange>({props.change})</CardRelChange>
      </Context>
    </Card>
  );
}

export default FeedCard;
