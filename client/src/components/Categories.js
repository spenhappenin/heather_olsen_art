import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { connect, } from 'react-redux';
import { Grid, Icon, } from 'semantic-ui-react';
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
          {
            user.id &&
              <ButtonContainer>
                <Link to={`/work/edit-category/${c.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => this.handleDelete(c.id)}>Delete</Button>
              </ButtonContainer>
          }
        </CategoryContainer>
      </Grid.Column>
    ));
  };

  displayAdminMenu = () => (
    <AdminMenu>
      <Link to='work/new-category'>
        <Button group>New Category</Button>
      </Link>
      <Link to='/work/all'>
        <Button>All Art</Button>
      </Link>
    </AdminMenu>
  );

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?"))
      axios.delete(`/api/categories/${id}`)
        .then( res => {
          // this.props.history.push('/work');
        })
        .catch( err => {
          // TODO: Error Handling
          console.log('Error deleting Category')
        })
  }

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
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
  transition: opacity .2s ease-out;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  &:hover {
    opacity: 0.7;
    transition: opacity .2s ease-out;
  }
`;

const CircleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid #131313;
  background: #b3b4ab;
`;

export default connect(mapStateToProps)(Categories);
