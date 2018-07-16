import React from 'react';
import axios from 'axios';
import { StyledContainer, } from '../styles/shared';

class AllArtwork extends React.Component {
  state = { artwork: [], };

  componentDidMount() {
    axios.get('/api/all_artworks')
      .then( res => {
        this.setState({ artwork: res.data, });
      })
      .catch( err => {
        // TODO: Error handling
        console.log('Error...')
      })
  };

  render() {
    return(
      <StyledContainer>

      </StyledContainer>
    );
  };
};

export default AllArtwork;
