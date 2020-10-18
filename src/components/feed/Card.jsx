import React from "react";
import {
  Card,
  CardIndicator,
  CardHighlight,
  CardTitle,
  CardRelChange,
  Context,
} from "../../styles/Card";
function FeedCard({activity, title, context, highlight, change}) {
  return (
    <Card>
      <CardIndicator>{activity}</CardIndicator>
      <CardTitle>{title}</CardTitle>
      <Context>
        {context} <br /> <CardHighlight>{highlight}</CardHighlight>{" "}
        <CardRelChange>({change})</CardRelChange>
      </Context>
    </Card>
  );
}

export default FeedCard;
