import React, { Component, } from "react";
import axios from "axios";
import styled from "styled-components";
// import { generateImageUrl, } from '../helpers/artwork';
import { Header, StyledContainer, } from "../styles/shared";

class SortArtwork extends Component {
  state = { categories: [], thumbnailSize: 100, };

  componentDidMount() {
    axios.get("/api/works")
      .then( res => {
        this.setState({ categories: res.data, });
      })
  };

  renderCategories = () => {
    const { categories, thumbnailSize, } = this.state;
    return categories.map( category => {
      return (
        <ArtworkCard>
          {/* <CardImage src={generateImageUrl(category.url, thumbnailSize)} /> */}
          <CardImage src={category.display_image} />
          <CardTitle>{category.title}</CardTitle>
        </ArtworkCard>
      ) 
    })
  };

  render() {
    return (
      <StyledContainer>
        <Header primary>Sort Categories</Header>
        { this.renderCategories() }
      </StyledContainer>
    );
  };
};

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

export default SortArtwork;
