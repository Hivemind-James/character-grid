// external imports
import React from "react";
import {
  Card,
  CardContent,
  Box,
  CardMedia,
  Typography,
  Container,
  ListItem,
  ListItemText,
} from "@mui/material";
import Image from "material-ui-image";
import { FixedSizeList } from "react-window";

// character wrapper for info page
const CharacterInfoWrapper = ({
  image,
  name,
  species,
  gender,
  created,
  origin,
  location,
  episodes,
  status,
  type,
}) => {
  // component for the list
  const Row = ({ index, style }) => {
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemText>
          {episodes[index].name} - {episodes[index].episode}
        </ListItemText>
      </ListItem>
    );
  };

  return (
    <Container
      sx={{ display: "flex", maxHeight: 700, justifyContent: "space-between" }}
    >
      <Card sx={{ maxHeight: 700, width: 400 }}>
        <CardMedia>
          <Image src={image} />
        </CardMedia>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">Name: {name}</Typography>
            <Typography variant="h5">Species: {species}</Typography>
            <Typography variant="h5">Gender: {gender}</Typography>
            <Typography variant="h6">Status: {status}</Typography>
            <Typography variant="h6">Type: {type}</Typography>
            <Typography variant="h6">Created: {created}</Typography>
            <Typography variant="h6">Origin: {origin}</Typography>
            <Typography variant="h6">Location: {location}</Typography>
          </Box>
        </CardContent>
      </Card>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          Episode List
        </Typography>
        <FixedSizeList
          height={700}
          width={450}
          itemSize={40}
          itemCount={episodes.length}
        >
          {Row}
        </FixedSizeList>
      </Box>
    </Container>
  );
};

export default CharacterInfoWrapper;
