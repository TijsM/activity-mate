import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
`;

export const Content = styled.div`
  margin-left: ${(props) => props.theme.spacing.margin};
  margin-right: ${(props) => props.theme.spacing.margin};
`;

export const Header = styled.div`
  display: flex;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  min-width: 80px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Back = styled.img`
  margin-right: auto;
`;

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 32px;
  line-height: 37px;
  margin: 0px;
`;

export const Strong = styled.strong`
  color: ${(props) => props.theme.colors.green};
  font-weight: bold;
`;

export const Context = styled.p`
  margin-top: ${props => props.theme.spacing.bigMargin};
  font-size: 18px;
  line-height: 22px;
  color: ${(props) => props.theme.colors.textGrey};
`;