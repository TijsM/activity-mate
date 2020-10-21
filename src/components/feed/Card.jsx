import React from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardIndicator,
  CardHighlight,
  CardTitle,
  Context,
} from "../../styles/Card";

function FeedCard(props) {
  const history = useHistory();

  return (
    <Card
      activity={props.activity}
      onClick={() => {
        history.push({
          pathname: props.detailRoute,
          state: { ...props },
        });
      }}
    >
      <CardIndicator>{props.activity}</CardIndicator>
      <CardTitle activity={props.activity}>{props.title}</CardTitle>
      <Context activity={props.activity}>
        {props.context} <br /> <CardHighlight>{props.highlight}</CardHighlight>{" "}
        {/* <CardRelChange>({props.change})</CardRelChange> */}
      </Context>
    </Card>
  );
}

export default FeedCard;
