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


function FeedCard({activity, title, context, highlight, change}) {
  const history = useHistory()

  return (
    <Card
     onClick={() => {
       history.push('detail')
       history.push({
        pathname: '/detail',
        state: { detail: 'some_value' }
    });
     }}>
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
