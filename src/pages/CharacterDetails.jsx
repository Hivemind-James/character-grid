import React from "react";
import { Container, Card, CardContent, CardMedia } from "@mui/material";
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

  if (loading) return "Loading";
  if (error) return `Error: ${error}`;

  return (
    <Container>
      <Card>
        <CardMedia>
          <Image src={data.character.image} />
        </CardMedia>
        <CardContent></CardContent>
      </Card>
    </Container>
  );
};

export default CharacterDetails;
