import React from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { connect, } from 'react-redux';
import { Link, } from 'react-router-dom';
import { setHeaders, } from '../actions/headers';
import { setFlash, } from '../actions/flash';
import { generateImageUrl, } from '../helpers/artWorks';
import { Button, Header, StyledContainer, } from '../styles/shared';

class AllArtwork extends React.Component {
  state = { artwork: [], currentPage: 1, thumbnailSize: 100, total_pages: 0, };

  componentDidMount() {
    axios.get('/api/all_artworks')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ artwork: res.data.artwork, total_pages: res.data.total_pages });
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
        this.props.dispatch(setFlash(err.response, 'red'));
      })
  };

  renderArtwork = () => {
    return this.state.artwork.map( (a, i) => (
      <Link key={i} to={`edit/${a.id}`}>
        <ArtworkCard>
          <CardImage src={generateImageUrl(a.url, this.state.thumbnailSize)} />
          <CardTitle>{a.title}</CardTitle>
        </ArtworkCard>
      </Link>
    ));
  };

  loadMore = () => {
    const page = this.state.currentPage + 1;
    axios.get(`/api/all_artworks?page=${page}`)
      .then( res => {
        this.setState( state => { 
          this.props.dispatch(setHeaders(res.headers));
          return {
            artwork: [...state.artwork, ...res.data.artwork], 
            total_pages: res.data.total_pages, 
            currentPage: this.state.currentPage + 1 
          }
        });
      })
      .catch( err => {
        this.props.dispatch(setHeaders(err.headers));
        this.props.dispatch(setFlash(err.response, 'red'));
      })
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
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMore}
            hasMore={this.state.currentPage < this.state.total_pages}
            loader={<div className="loader" key={0}>Loading ...</div>}
            initialLoad={false}
          >
        <Grid>
            { this.renderArtwork() }
        </Grid>
          </InfiniteScroll>
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

const CardImage = styled.div`
  background-image: ${ props => `url(${props.src})` };
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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

export default connect()(AllArtwork);
