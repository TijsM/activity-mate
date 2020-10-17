import React from "react";
import { ThemeProvider } from "styled-components";


const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    green: "#38F257",
    red: "red",
  },
  spacing: {
    pagePadding: '16px',
  }
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;