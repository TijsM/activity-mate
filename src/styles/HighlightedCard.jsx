import styled from "styled-components";

import { CardTitle as DefaultTitle, Context as DefaultContext } from "./Card";

export const Container = styled.div`
  margin-top: ${(props) => props.theme.spacing.bigMargin};
  margin-bottom: ${(props) => props.theme.spacing.bigMargin};
  margin-left: ${(props) => props.theme.spacing.margin};
  margin-right: ${(props) => props.theme.spacing.margin};
`;

export const CardTitle = styled(DefaultTitle)`
  color: ${(props) => props.theme.colors.black};
  font-size: 24px;
  line-height: 28px;
`;

export const Context = styled(DefaultContext)`
  color: ${(props) => props.theme.colors.black};
  font-size: 14px;
  line-height: 16px;
  margin-bottom: -10px;
`;

export const ChartContainer = styled.div`
  padding-left: ${props => props.theme.spacing.smallPadding};
  padding-right: ${props => props.theme.spacing.smallPadding}
`;
