// external imports
import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

// internal imports
import Characters from "./Characters";
import CharacterDetails from "./CharacterDetails";

const Home = () => {
  return (
    <>
      <AppBar position="static" sx={{ height: 50 }}>
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" component="div" sx={{ color: "#ffffff" }}>
            Rick and Morty Wiki
          </Typography>
        </Box>
      </AppBar>
      <Toolbar />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/:id" element={<CharacterDetails />} />
      </Routes>
    </>
  );
};

export default Home;
