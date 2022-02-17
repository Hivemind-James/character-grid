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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useNavigate } from "react-router-dom";

// internal imports
import CharacterWrapper from "../components/CharacterWrapper";

// get characters query
const SEARCH_CHARACTERS = gql`
  query Search(
    $page: Int
    $name: String!
    $gender: String!
    $species: String!
    $status: String!
    $type: String!
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        gender: $gender
        species: $species
        status: $status
        type: $type
      }
    ) {
      info {
        count
        pages
      }
      results {
        name
        type
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
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");

  // logic to navigate to the character details page
  let navigate = useNavigate();
  const routeChange = (id) => {
    navigate(`${id}`);
  };

  const { loading, error, data } = useQuery(SEARCH_CHARACTERS, {
    variables: {
      page: page,
      name: name,
      gender: gender,
      status: status,
      species: species,
      type: type,
    },
  });

  // filter change handlers
  const handleGenderFilter = (e) => {
    setGender(e.target.value);
    setPage(1);
  };
  const handleSpeciesFilter = (e) => {
    setSpecies(e.target.value);
    setPage(1);
  };
  const handleStatusFilter = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };
  const handleTypeFilter = (e) => {
    setType(e.target.value);
    setPage(1);
  };

  // set the search term and return page to 1
  const handleSearch = () => {
    setName(searchTerm);
    setPage(1);
  };

  // pagenation handler
  const handlePagenationChange = (e, v) => {
    setPage(v);
  };

  // loading spinner
  if (loading)
    return (
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );

  // error display
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
          height: 140,
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
            justifyContent: "space-between",
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
        {/* TODO: Refactor out filter fields to seperate component to declutter */}
        <Box sx={{ display: "flex" }}>
          <Box sx={{ minWidth: 130, marginRight: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Species</InputLabel>
              <Select
                value={species}
                label="Species"
                onChange={handleSpeciesFilter}
              >
                <MenuItem value={"human"}>Human</MenuItem>
                <MenuItem value={"alien"}>Alien</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 130, marginRight: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                label="Gender"
                onChange={handleGenderFilter}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"unknown"}>Unknown</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 130, marginRight: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={handleStatusFilter}
              >
                <MenuItem value={"dead"}>Dead</MenuItem>
                <MenuItem value={"alive"}>Alive</MenuItem>
                <MenuItem value={"unknown"}>Unknown</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* TODO: Make type a input text box as its not just a few options */}
          <Box sx={{ minWidth: 130, marginRight: 5 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={type} label="Type" onChange={handleTypeFilter}>
                <MenuItem value={"human"}>Human</MenuItem>
                <MenuItem value={"alien"}>Alien</MenuItem>
                <MenuItem value={"experiment"}>Experiment</MenuItem>
              </Select>
            </FormControl>
          </Box>
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
