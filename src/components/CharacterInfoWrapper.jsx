// external imports
import React from "react";
import { Card, CardContent, Box, CardMedia, Typography } from "@mui/material";
import Image from "material-ui-image";

// character wrapper for info page
const CharacterInfoWrapper = ({
  image,
  name,
  species,
  gender,
  created,
  origin,
  location,
  episode,
}) => {
  return (
    <Card sx={{ maxHeight: 600, maxWidth: 400 }}>
      <CardMedia>
        <Image src={image} />
      </CardMedia>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography>Name: {name}</Typography>
          <Typography>Species: {species}</Typography>
          <Typography>Gender: {gender}</Typography>
          <Typography>Created: {created}</Typography>
          <Typography>Origin: {origin}</Typography>
          <Typography>Location: {location}</Typography>
          <Typography>Episode: {episode}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CharacterInfoWrapper;
