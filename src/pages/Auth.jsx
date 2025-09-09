import React from "react";
import styled from "styled-components";
import LogoHeader from "../components/LogoHeader";
import { H1 } from "../components/Types";
import getAuthCode from "../lib/getAuthCode";

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

const Footer = styled.div`
  position: fixed;
  bottom: ${(props) => props.theme.spacing.margin};
  left: ${(props) => props.theme.spacing.margin};
  right: ${(props) => props.theme.spacing.margin};
  text-align: center;
`;

const RodiLink = styled.a`
  color: ${(props) => props.theme.colors.textGrey};
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: ${(props) => props.theme.colors.green};
  }
`;

function Auth() {
  return (
    <Container>
      <LogoHeader />
      <Content>
        <H1>Hi there!</H1>
        <ContentBlock>
          Working on your <Strong>health and fitness</Strong> is only possible
          if you know how you're doingcompared to your previous prestations.
        </ContentBlock>
        <ContentBlock>
          Sign in with your <Strong>Withings</Strong> account and take look on
          how you're doing.
        </ContentBlock>
        <LinkContainer
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("token_expiration");
            getAuthCode();
          }}
        >
          Let's go
        </LinkContainer>
      </Content>
      <Footer>
        <RodiLink
          href="https://rodi.digital.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Rodi Digital
        </RodiLink>
      </Footer>
    </Container>
  );
}

export default Auth;
