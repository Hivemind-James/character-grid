// external imports
import React, { useState } from "react";
import {
  Grid,
  Container,
  Pagination,
  Box,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";

// internal imports
import CharacterWrapper from "../components/CharacterWrapper";

// get characters query
const SEARCH_CHARACTERS = gql`
  query Search($name: String) {
    characters(filter: { name: $name }) {
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
  const [searchTerm, setSearchTerm] = useState();
  const [characters, setCharacters] = useState();

  const { loading, error, data } = useQuery(GET_CHARACTERS);

  // logic to navigate to the character details page
  let navigate = useNavigate();
  const routeChange = (id) => {
    navigate(`${id}`);
  };

  const { searchData } = useQuery(SEARCH_CHARACTERS, {
    variables: { name: searchTerm },
  });

  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
    setCharacters(searchData.characters.results);
  };

  if (loading)
    return (
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  if (error)
    return (
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>Error: {error}</Typography>{" "}
      </Container>
    );

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: 70,
          marginBottom: 5,
        }}
      >
        <Typography sx={{ marginBottom: 1 }} variant="h2">
          Characters
        </Typography>
        <TextField
          sx={{ width: 400, backgroundColor: "#ffffff" }}
          label="Search"
          size="small"
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </Box>
      <Grid container spacing={4} direction="row" sx={{ marginBottom: 5 }}>
        {data.characters.results.map((char) => (
          <Grid item xs={3} key={char.name}>
            <CharacterWrapper
              name={char.name}
              image={char.image}
              id={char.id}
              detailsOnClick={routeChange}
            />
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
