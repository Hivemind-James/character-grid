// external imports
import React from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

// internal imports
import CharacterInfoWrapper from "../components/CharacterInfoWrapper";

const CharacterDetails = () => {
  // get id from url parameters
  let { id } = useParams();

  // query
  const GET_DETAILS = gql`
    query {
        character(id: ${id}) {
          name
          status
          species
          gender
          image
          type
          created
          origin {
            name
          }
          location {
            name
          }
          episode {
            name
            episode
          }
        }
      }
    `;

  const { loading, error, data } = useQuery(GET_DETAILS);

  if (loading)
    return (
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Typography>`Error: ${error}`</Typography>{" "}
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
          Character Details
        </Typography>
      </Box>
      <Box>
        <CharacterInfoWrapper
          image={data.character.image}
          name={data.character.name}
          gender={data.character.gender}
          origin={data.character.origin.name}
          status={data.character.status}
          species={data.character.species}
          location={data.character.location.name}
          episodes={data.character.episode}
          created={data.character.created}
          type={data.character.type}
        />
      </Box>
    </Container>
  );
};

export default CharacterDetails;
