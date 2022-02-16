import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import Image from "material-ui-image";

const CharacterWrapper = ({ image, name, id, detailsOnClick }) => {
  return (
    <Card sx={{ maxHeight: 450, maxWidth: 380 }}>
      <CardMedia>
        <Image src={image} />
      </CardMedia>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">{name}</Typography>
          <Button
            sx={{ maxHeight: 40, color: "#FFFFFF" }}
            size="small"
            variant="contained"
            onClick={() => {
              detailsOnClick(id);
            }}
          >
            Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CharacterWrapper;
