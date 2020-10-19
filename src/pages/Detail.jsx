import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import LogoHeader from "../components/LogoHeader";
import {
  Strong,
  Container,
  Content,
  Header,
  BackButton,
  Back,
  H1,
  Context,
} from "../styles/Details";
import backImage from "../assets/back.svg";

const getHighlightedText = (text) => {
  console.log(text.split("_"));

  return text.split("_").map((part, i) => {
    if (i === 1) {
      return <Strong key={i}>{part}</Strong>;
    } else {
      return <span key={i}>{part}</span>;
    }
  });
};

function Detail() {
  const location = useLocation();
  const history = useHistory();
  const props = location.state;

  console.log(props);

  return (
    <Container>
      <LogoHeader />
      <Content>
        <Header>
          <BackButton onClick={history.goBack}>
            <Back src={backImage} alt="back button" />
          </BackButton>
          <H1>{props.title}</H1>
        </Header>
        <Context>{getHighlightedText(props.data.detailDescription)}</Context>
      </Content>
    </Container>
  );
}

export default Detail;
