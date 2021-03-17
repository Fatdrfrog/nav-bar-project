import React from "react";
import NavBar from "./NavBar";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const theme = createMuiTheme({
  status: {
    danger: red[1000],
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
    </ThemeProvider>
  );
}
