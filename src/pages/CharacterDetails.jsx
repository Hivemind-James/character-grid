import React from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Image from "material-ui-image";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";

const CharacterDetails = () => {
  let { id } = useParams();

  const GET_DETAILS = gql`
    query {
        character(id: ${id}) {
          name
          status
          species
          gender
          image
          created
          origin {
            name
          }
          location {
            name
          }
          episode {
            name
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
      <Card sx={{ maxHeight: 600, maxWidth: 400 }}>
        <CardMedia>
          <Image src={data.character.image} />
        </CardMedia>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography>Name: {data.character.name}</Typography>
            <Typography>Species: {data.character.species}</Typography>
            <Typography>Gender: {data.character.gender}</Typography>
            <Typography>Created: {data.character.created}</Typography>
            <Typography>Origin: {data.character.origin.name}</Typography>
            <Typography>Location: {data.character.location.name}</Typography>
            <Typography>Episode: {data.character.episode.name}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CharacterDetails;
