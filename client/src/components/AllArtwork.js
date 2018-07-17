import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import { StyledContainer, Button, Header, } from '../styles/shared';

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

  renderArtwork = () => {
    return this.state.artwork.map( a => (
      <Link to={`edit/${a.id}`}>
        <ArtworkCard>
          <CardImage src={a.url} />
          <CardTitle>{a.title}</CardTitle>
        </ArtworkCard>
      </Link>
    ));
  };

  render() {
    return(
      <StyledContainer>
        <Header primary>All Artwork</Header>
        <Link to={`${this.props.path}/new`} rel="noopener noreferrer">
          <Button>New</Button>
        </Link>
        <br />
        <br />
        <Grid>
          { this.renderArtwork() }
        </Grid>
      </StyledContainer>
    );
  };
};

const ArtworkCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #131313;
  height: 60px;
`;

const CardImage = styled.img`
  /* FIXME: doesnt work for some reason - have to use img tag?? */
  /* background-image: ${ props => `url(${props.src})` };
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  height: 60px;
  width: 60px;
`;

const CardTitle = styled.p`
  font-family: 'Julius Sans One', sans-serif;
  font-weight: 700;
  color: rgba(0,0,0,.87);
  text-transform: uppercase;
  font-size: 15px;
  margin-left: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(3, 1fr);
`;

export default AllArtwork;
