import React from 'react';
import styled from 'styled-components';
import { StyledContainer, } from '../styles/shared';
import { Grid, Image, Segment, } from 'semantic-ui-react';

class Categories extends React.Component {

  displayCategories = () => {
    return this.props.categories.map( c => (
      <Grid.Column mobile={8} tablet={4} computer={5}>
        <CategoryImage url={ c.display_image } />
        <CategoryTitle>{ c.title }</CategoryTitle>
      </Grid.Column>
    ));
  };

  render() {
    return(
      <CategoryContainer>
        <Grid columns='equal' centered>
          { this.displayCategories() }
        </Grid>
      </CategoryContainer>
    );
  };
};

const CategoryContainer = styled.div`
  margin-bottom: 100px;
  margin-top: 50px;
  padding-left: 60px;
  padding-right: 60px;
`;

const CategoryTitle = styled.p`
  text-align: center;
  padding-top: 10px;
  text-transform: uppercase;
  font-family: 'Julius Sans One', sans-serif !important;
`;

const CategoryImage = styled.div`
  border: 1px solid #0000002e;
  display: flex;
  background: ${ props => `url(${props.url})` };
  background-size: cover;
  background-position: center;
  background-repeat: 'no-repeat';
  width: 100%;
  overflow: hidden;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

export default Categories;
