import React from "react";
import styled from "styled-components";
import { useLocation, useHistory } from "react-router-dom";

import LogoHeader from "../components/LogoHeader";

import backImage from "../assets/back.svg";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-left: ${(props) => props.theme.spacing.margin};
  margin-right: ${(props) => props.theme.spacing.margin};
`;

const Header = styled.div`
  display: flex;
`;
const BackButton = styled.button`
  background: none;
  border: none;
  min-width: 80px;
  display: flex;
  align-items: center;
`;
const Back = styled.img`
  margin-right: auto;
`;
const H1 = styled.h1`
  font-weight: bold;
  font-size: 32px;
  line-height: 37px;
  margin: 0px;

`;

const Strong = styled.strong`
  color: ${(props) => props.theme.colors.green};
  font-weight: bold;
`;

const Context = styled.p`
  margin-top: ${props => props.theme.spacing.bigMargin};
  font-size: 18px;
  line-height: 22px;

  color: ${(props) => props.theme.colors.textGrey};
`;

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
