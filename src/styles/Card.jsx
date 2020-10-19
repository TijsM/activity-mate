import styled from "styled-components";

export const Card = styled.article`
  background-color: ${(props) => props.theme.colors.black};
  color: white;
  box-shadow: 0px 4px 16px rgba(200, 200, 200, 0.18);
  border-radius: ${(props) => props.theme.radius.card};
  padding: ${(props) => props.theme.spacing.padding};
    box-sizing: border-box;
  width: 100%;
  max-width: 500px;
`;

export const CardIndicator = styled.p`
  color: ${(props) => props.theme.colors.textGrey};
  font-size: 16px;
  font-weight: bold;
  line-height: 19px;
  margin-bottom: 0px;
`;

export const CardTitle = styled.h2`
  color: ${(props) => props.theme.colors.white};
  font-weight: bold;
  font-size: 32px;
  line-height: 37px;
  margin-top: 0px;
`;

export const Context = styled.p`
  color: ${(props) => props.theme.colors.white};
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
`;

export const CardHighlight = styled.strong`
  color: ${(props) => props.theme.colors.green};
  font-weight: 800;
`;

export const CardRelChange = styled.span`
  color: ${(props) => props.theme.colors.lightGrey};
  font-weight: 800;
`;