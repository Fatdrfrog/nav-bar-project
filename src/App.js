import React from "react";
import NavBar from "./NavBar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

const theme = createMuiTheme({
  status: {
    danger: purple[1000],
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
    </ThemeProvider>
  );
}
