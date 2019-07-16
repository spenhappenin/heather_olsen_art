import React, { useState, useEffect, } from "react";
import axios from "axios";
import styled from "styled-components";
// import { generateImageUrl, } from '../helpers/artwork';
import { Header, StyledContainer, } from "../styles/shared";
import { sortableContainer, sortableElement, } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = sortableElement( ({ value, }) => {
  return (
    <ArtworkCard>
      {/* <CardImage src={generateImageUrl(category.url, thumbnailSize)} /> */}
      <CardImage src={value.display_image} />
      <CardTitle>{value.title}</CardTitle>
    </ArtworkCard>
  );
});

const SortableContainer = sortableContainer( ({ children }) => {
  return <div>{ children }</div>
});

class SortCategory extends React.Component {
  state = { categories: [], };

  componentDidMount() {
    axios.get("/api/works")
      .then( res => this.setState({ categories: res.data }))
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(oldIndex + 1)
    console.log(newIndex + 1)
    axios.put("/api/categories/change_order", { new_index: newIndex + 1, old_index: oldIndex + 1, })
      .then( res => {
        this.setState(({ categories }) => ({
          categories: arrayMove(categories, oldIndex, newIndex),
        }));
      })
  };
  
  render() {
    return (
      <StyledContainer>
        <Header primary>Sort Categories</Header>
        <SortableContainer onSortEnd={this.onSortEnd}>
          { this.state.categories.map( (value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} />
          ))}
        </SortableContainer>
      </StyledContainer>
    );
  };
};

const ArtworkCard = styled.div`
  align-items: center;
  background: #fff;
  border: 0.5px solid #131313;
  border-left: none;
  display: flex;
  cursor: pointer;
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
  color: rgba(0,0,0,.87);
  font-family: 'Julius Sans One', sans-serif;
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
  text-transform: uppercase;
  
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
`;

export default SortCategory;
