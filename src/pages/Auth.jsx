import React from "react";
import styled from "styled-components";
import LogoHeader from "../components/LogoHeader";
import { H1 } from "../components/Types";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-left: ${(props) => props.theme.spacing.margin};
  margin-right: ${(props) => props.theme.spacing.margin};
`;

const ContentBlock = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: ${(props) => props.theme.colors.textGrey};
`;

const Strong = styled.strong`
  color: ${(props) => props.theme.colors.green};
  font-weight: bold;
`;

const LinkContainer = styled.div`
  height: 60px;
  width: 200px;
  background-color: ${(props) => props.theme.colors.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  padding-left: ${(props) => props.theme.spacing.margin};
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  cursor: pointer;
`;

function Auth() {
  const url = `http://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&state=authenticated&scope=user.activity&redirect_uri=${window.location.href}`;

  return (
    <Container>
      <LogoHeader />
      <Content>
        <H1>Hi there!</H1>
        <ContentBlock>
          Working on your <Strong>health and fitness</Strong> is only possible
          if you know how you’re doingcompared to your previous prestations.
        </ContentBlock>
        <ContentBlock>
          Sign in with your <Strong>Withings</Strong> account and take look on
          how you’re doing.
        </ContentBlock>
        <LinkContainer
          onClick={() => {
            window.location.href = url;
          }}
        >
          Let's go
        </LinkContainer>
      </Content>
    </Container>
  );
}

export default Auth;
