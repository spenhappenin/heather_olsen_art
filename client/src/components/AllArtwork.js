import React, { useContext, useEffect, useState, } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import { FlashContext, } from "../providers/FlashProvider";
import { Link, } from 'react-router-dom';
import { generateImageUrl, } from '../helpers/artwork';
import { Button, Header, StyledContainer, } from '../styles/shared';

const AllArtwork = (props) => {
  const [artwork, setArtwork] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [thumbnailSize, setThumbnailSize] = useState(100);
  const [totalPages, setTotalPages] = useState(0);

  const { setFlashMessage, } = useContext(FlashContext);

  useEffect( () => {
    axios.get('/api/all_artworks')
      .then( res => {
        setArtwork(res.data.artwork);
        setTotalPages(res.data.total_pages);
      })
      .catch( err => {
        setFlashMessage(err.response, "red");
      })
  }, [])

  const renderArtwork = () => {
    return artwork.map( a => (
      <Link key={a.id} to={`edit/${a.id}`}>
        <ArtworkCard>
          <CardImage src={generateImageUrl(a.url, thumbnailSize)} />
          <CardTitle>{ a.title }</CardTitle>
        </ArtworkCard>
      </Link>
    ));
  };

  const loadMore = () => {
    const page = currentPage + 1;

    axios.get(`/api/all_artworks?page=${page}`)
      .then( res => {
        setArtwork([...artwork, ...res.data.artwork]);
        setTotalPages(res.data.total_pages);
        setCurrentPage(currentPage + 1);
      })
      .catch( err => {
        setFlashMessage(err.response, "red");
      })
  };

  return (
    <StyledContainer>
      <Header primary>All Artwork</Header>
      <Link to={`${props.path}/new`} rel="noopener noreferrer">
        <Button>New</Button>
      </Link>
      <br />
      <br />
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={currentPage < totalPages}
        loader={<div className="loader" key={0}>Loading ...</div>}
        initialLoad={false}
      >
        <Grid>
          { renderArtwork() }
        </Grid>
      </InfiniteScroll>
    </StyledContainer>
  );
};

const ArtworkCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #131313;
  border-left: none;
  height: 60px;
`;

const CardImage = styled.div`
  background-image: ${ props => `url(${props.src})` };
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid black;
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
