// external imports
import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import { Routes, Route } from "react-router-dom";

// internal imports
import Characters from "./Characters";
import CharacterDetails from "./CharacterDetails";

const Home = (props) => {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{ height: 70, backgroundColor: "#ffffff" }}
      ></AppBar>
      <Toolbar />
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/:id" element={<CharacterDetails />} />
      </Routes>
    </>
  );
};

export default Home;
