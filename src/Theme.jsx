import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    textGrey: "#5F5F5F",
    green: "#38F257",
    red: "red",
  },
  spacing: {
    margin: "16px",
    bigMargin: "48px",
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
