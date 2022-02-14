import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import React from "react";
import { styled, ThemeProvider, CssBaseline } from "@mui/material";

import Home from "./pages/Home";
import theme from "./theme";

const StyledDiv = styled("div")({
  width: "100%",
  height: "100%",
});

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql/",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledDiv>
          <Home />
        </StyledDiv>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
