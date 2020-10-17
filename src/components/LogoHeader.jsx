import React from "react";
import styled from "styled-components";
import LogoImage from "../assets/logo.svg";

const Container = styled.header`
  height: 160px;
  display: flex;
`;

const Logo = styled.img`
  width: 80px;
  margin-left: ${(props) => props.theme.spacing.margin};
`;

function LogoHeader() {
  return (
    <Container>
      <Logo src={LogoImage} alt="Logo" />
    </Container>
  );
}

export default LogoHeader;
