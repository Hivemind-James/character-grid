import React from 'react';
import {Container, Card, CardContent, CardMedia} from '@mui/material'
import Image from 'material-ui-image';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';



const CharacterDetails = ({id}) => {
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
    `

    const { loading, error, data } = useQuery(GET_DETAILS);

    if (loading) return 'Loading';
    if (error) return `Error: ${error}`;

    console.log(data);

    return (
        <Container>
            <Card>
                <CardMedia>
                    <Image src={data.characters.results.image}/>
                </CardMedia>
                <CardContent>

                </CardContent>
            </Card>
        </Container>
    )
}

export default CharacterDetails;