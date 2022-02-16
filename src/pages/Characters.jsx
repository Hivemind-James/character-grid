// external imports
import React, { useState, useEffect } from "react";
import { Grid, Container, Pagination, Box, TextField } from "@mui/material";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";

// internal imports
import CharacterWrapper from "../components/CharacterWrapper";

// get characters query
const GET_CHARACTERS = gql`
  query {
    characters {
      info {
        count
        pages
      }
      results {
        name
        image
        id
      }
    }
  }
`;

// TODO: Pagenate using nodes and edges in graphQL
const Characters = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) return "Loading";
  if (error) return `Error: ${error}`;

  return (
    <Container>
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
      <Grid container spacing={4} direction="row" sx={{ marginBottom: 5 }}>
        {data.characters.results.map((char) => (
          <Grid item xs={3} key={char.name}>
            <CharacterWrapper name={char.name} image={char.image} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ margin: 5, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={data.characters.info.pages}
          color="secondary"
          size="large"
        />
      </Box>
    </Container>
  );
};

export default Characters;
