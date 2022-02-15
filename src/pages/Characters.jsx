// external imports
import React from 'react';
import {
    Grid,
    Container,
    Pagination,
    Box
  } from "@mui/material";
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks'

// internal imports
import CharacterWrapper from '../components/CharacterWrapper';

// get characters query
const GET_CHARACTERS = gql`
query {
    characters {
      info {
        count,
        pages
      }
      results {
        name,
        image,
        id
      }
    }
  }
`

// TODO: Pagenate using nodes and edges in graphQL
const Characters = () => {
    const { loading, error, data } = useQuery(GET_CHARACTERS);

    if (loading) return 'Loading';
    if (error) return `Error: ${error}`;

    return (
        <Container>
            <Grid container spacing={4} direction="row" sx={{marginBottom: 5}}>
                {data.characters.results.map((char) => (
                     <Grid item xs={3} key={char.name}>
                         <CharacterWrapper name={char.name} image={char.image} />
                    </Grid>
                 ))}
            </Grid>
            <Box sx={{margin: 5, display: 'flex', justifyContent: 'center'}}>
                <Pagination count={data.characters.info.pages} color="secondary" size="large"  />
            </Box>
        </Container>

    )     
}

export default Characters;