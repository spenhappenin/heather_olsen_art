import React, { useState, useEffect, } from "react";
import axios from "axios";
import styled from "styled-components";
// import { generateImageUrl, } from '../helpers/artwork';
import { Header, StyledContainer, } from "../styles/shared";

const SortCategory = (props) => {
  const [categories, setCategories] = useState([]);
  const [thumbnailSize, setThumbnailSize] = useState(100);

  useEffect( () => {
    axios.get("/api/works")
      .then( res => setCategories(res.data))
  }, [])

  const renderCategories = () => {
    return categories.map( category => 
      <ArtworkCard>
        {/* <CardImage src={generateImageUrl(category.url, thumbnailSize)} /> */}
        <CardImage src={category.display_image} />
        <CardTitle>{category.title}</CardTitle>
      </ArtworkCard>
    )
  };

  return (
    <StyledContainer>
      <Header primary>Sort Categories</Header>
      { renderCategories() }
    </StyledContainer>
  );
}

const ArtworkCard = styled.div`
  display: flex;
  align-items: center;
  border: 0.5px solid #131313;
  border-left: none;
  height: 100px;
  margin-bottom: 5px;
`;

const CardImage = styled.div`
  background-image: ${ props => `url(${props.src})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid black;
  height: 100px;
  width: 100px;
`;

const CardTitle = styled.p`
  font-family: 'Julius Sans One', sans-serif;
  font-weight: 700;
  color: rgba(0,0,0,.87);
  text-transform: uppercase;
  font-size: 15px;
  margin-left: 10px;
`;

export default SortCategory;
