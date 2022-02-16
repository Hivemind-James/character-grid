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
  Button,
} from "@mui/material";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";

// internal imports
import CharacterWrapper from "../components/CharacterWrapper";

// get characters query
const SEARCH_CHARACTERS = gql`
  query Search($page: Int, $name: String!) {
    characters(page: $page, filter: { name: $name }) {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);

  // logic to navigate to the character details page
  let navigate = useNavigate();
  const routeChange = (id) => {
    navigate(`${id}`);
  };

  const { loading, error, data } = useQuery(SEARCH_CHARACTERS, {
    variables: { page: page, name: name },
  });

  // set the search term and return page to 1
  const handleSearch = () => {
    setName(searchTerm);
    setPage(1);
  };

  // pagenation handler
  const handlePagenationChange = (e, v) => {
    setPage(v);
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
        <Box
          sx={{
            display: "flex",
            marginBottom: 2,
            height: 40,
            alignItems: "center",
          }}
        >
          <TextField
            sx={{ width: 400, backgroundColor: "#ffffff" }}
            label="Search"
            size="small"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <Button
            sx={{ marginLeft: 2, color: "#ffffff" }}
            color="secondary"
            size="small"
            variant="contained"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4} direction="row" sx={{ marginBottom: 5 }}>
        {data.characters.results.map((char) => (
          <Grid item xs={3} key={char.id}>
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
          showFirstButton
          showLastButton
          count={data.characters.info.pages}
          color="secondary"
          size="large"
          page={page}
          onChange={handlePagenationChange}
        />
      </Box>
    </Container>
  );
};

export default Characters;
