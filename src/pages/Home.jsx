// external imports
import React from "react";
import { AppBar, Box, TextField, Toolbar } from "@mui/material";

// internal imports
import Characters from './Characters';

// TODO: simple SPA in this page for characters and character info pages
const Home = (props) => {
  return (
    <>
    <AppBar position="sticky" sx={{ height: 70, backgroundColor: "#ffffff" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 70,
        }}
      >
        <TextField
          sx={{ width: 400, backgroundColor: "#ffffff" }}
          label="Character Search"
          size="small"
          onChange={(e) => {}}
        />
      </Box>
    </AppBar>
    <Toolbar />
    <Characters />
    </>
  );
};

export default Home;
