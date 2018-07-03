import React from 'react';
import styled from 'styled-components';
import { Link, } from '../styles/shared';
import { StyledContainer, } from '../styles/shared';
import { Grid, Image, Segment, } from 'semantic-ui-react';

class Categories extends React.Component {

  displayCategories = () => {
    return this.props.categories.map( c => (
      <Grid.Column mobile={8} tablet={4} computer={5}>
        <CategoryContainer>
        <Link to={`/work/${c.route}`}>
          <CategoryImage url={ c.display_image } />
          <CategoryTitle>{ c.title }</CategoryTitle>
        </Link>
        </CategoryContainer>
      </Grid.Column>
    ));
  };

  render() {
    return(
      <CategoriesContainer>
        <Grid columns='equal' centered>
          { this.displayCategories() }
        </Grid>
      </CategoriesContainer>
    );
  };
};

const CategoriesContainer = styled.div`
  margin-bottom: 125px;
  margin-top: 50px;
  padding-left: 60px;
  padding-right: 60px;
`;

const CategoryContainer = styled.div`
  opacity: 1;
  transition: opacity .2s ease-out;

  &:hover {
    opacity: 0.7;
    transition: opacity .2s ease-out;
  }
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
