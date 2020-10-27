import React from "react";
import styled, { keyframes } from "styled-components";
import LogoImage from "../assets/logo.svg";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Logo = styled.img`
  width: 140px;
  margin-left: ${(props) => props.theme.spacing.margin};
  animation: ${rotate} 1s cubic-bezier(0.75, 0, 0.25, 1) infinite;
`;

function SplashScreen() {
  return (
    <Container>
      <Logo src={LogoImage} alt="Logo" />
    </Container>
  );
}

export default SplashScreen;
