import React from 'react';
import styled from 'styled-components';
import { connect, } from 'react-redux';
import { Grid, } from 'semantic-ui-react';
import { Button, Link, } from '../styles/shared';

class Categories extends React.Component {

  displayCategories = () => {
    const { user, } = this.props;
    
    return this.props.categories.map( c => (
      <Grid.Column mobile={8} tablet={4} computer={5}>
        <CategoryContainer>
          <Link to={user.id ? `/work/admin-${c.route}` : `/work/${c.route}`}>
            <CategoryImage url={ c.display_image } />
            <CategoryTitle>{ c.title }</CategoryTitle>
          </Link>
        </CategoryContainer>
      </Grid.Column>
    ));
  };

  displayAdminMenu = () => (
    <AdminMenu>
      <Button group>New Category</Button>
      <Link to='/work/all'>
        <Button>All Art</Button>
      </Link>
    </AdminMenu>
  );

  render() {
    return(
      <CategoriesContainer>
        { this.props.user.id && this.displayAdminMenu() }
        <Grid columns='equal' centered>
          { this.displayCategories() }
        </Grid>
      </CategoriesContainer>
    );
  };
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

const AdminMenu = styled.div`
  margin-bottom: 25px;
`;

const CategoriesContainer = styled.div`
  margin-bottom: 125px;
  margin-top: 50px;
  padding-left: 9%;
  padding-right: 9%;
`;

const CategoryContainer = styled.div`
  max-width: 376px;
  opacity: 1;
  transition: opacity .2s ease-out;

  &:hover {
    opacity: 0.7;
    transition: opacity .2s ease-out;
  }
`;

const CategoryTitle = styled.p`
  font-family: 'Julius Sans One', sans-serif !important;
  font-size: 17px;
  padding-top: 10px;
  text-align: center;
  text-transform: uppercase;
`;

const CategoryImage = styled.div`
  border: 1px solid #0000002e;
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

export default connect(mapStateToProps)(Categories);
