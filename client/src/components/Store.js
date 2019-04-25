import React, { useState, useEffect, } from "react";
import axios from "axios";
import styled from "styled-components";
import { formatPrice, } from "../helpers/cart";
import { useWindowWidth, } from "./hooks/WindowWidth";
import { StyledContainer, Header, Link, } from "../styles/shared";

const Store = (props) => {
  const [artworks, setArtwork] = useState([]);
  const windowWidth = useWindowWidth();

  useEffect( () => {
    axios.get("/api/available_artwork")
      .then( res => {
        setArtwork(res.data);
      })
      .catch( err => {
        console.log(err.catch);
      })
  }, []);

  const displayArtworks = () => {
    if (!artworks) return;

    return artworks.map( artwork => {
      const price = formatPrice(artwork.price);

      return (
        <Link 
          to={`/available-work/${artwork.id}`} 
          key={artwork.id} 
          style={{ display: "flex", }}
        >
          <Column>
            <Image
              alt={artwork.title}
              srcSet={artwork.srcSet}
              src={artwork.url}
              style={{ width: "100%", }}
            />
            <ArtworkDescription>
              <Text>{ artwork.title }</Text>
              <Text price>
                ${ price }
              </Text>
            </ArtworkDescription>
          </Column>
        </Link>
    )});
  };

  return (
    <StyledContainer>
      <Header primary>Available Work</Header>
      <Grid width={windowWidth}>
        { displayArtworks() }
      </Grid>
    </StyledContainer>
  )
}

const ArtworkDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const Text = styled.p`
  font-family: ${ props => props.price ? '"Merriweather Sans", sans - serif' : '"Julius Sans One", sans-serif'};
  font-weight: ${ props => props.price && "bold" };
  margin-top: -10px;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-template-columns: ${ props => `repeat(${props.width <= 750 ? 2 : 3}, 1fr)` };
`;

const Column = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > img {
    transition: opacity 0.3s ease;
    opacity: 1;
  }

  &:hover {
    & > img {
      transition: opacity 0.3s ease;
      opacity: 0.8;
    }
  }
`;

const Image = styled.img`
  width: 100%;
`;

export default Store;
