import React, { useContext, useEffect, useState, } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext, } from "../providers/AuthProvider";
import { FlashContext, } from "../providers/FlashProvider";
import { Grid, } from 'semantic-ui-react';
import { Button, Link, } from '../styles/shared';

const Categories = (props) => {  
  const [categories, setCategories] = useState([]);
  const { user, } = useContext(AuthContext);
  const { setFlash, } = useContext(FlashContext);

  useEffect( () => {
    user && user.admin ? 
      axios.get("/api/admin/categories/categories")
        .then( res => {
          setCategories(res.data);
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
    :
      axios.get("/api/categories")
        .then( res => {
          setCategories(res.data);
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
  }, []);

  const displayCategories = () => {
    return categories.map( c => (
      <Grid.Column key={c.id} mobile={8} tablet={4} computer={5}>
        <CategoryContainer>
          <Link to={user ? `/work/admin-${c.route}` : `/work/${c.route}`}>
            <CategoryImage url={c.display_image} />
            <CategoryTitle>{c.title}</CategoryTitle>
          </Link>
          {
            user &&
            <ButtonContainer>
              <Link to={`/work/edit-category/${c.id}`}>
                <Button>Edit</Button>
              </Link>
              <Button onClick={() => handleDelete(c.id)}>Delete</Button>
            </ButtonContainer>
          }
        </CategoryContainer>
      </Grid.Column>
    ));
  };

  const displayAdminMenu = () => (
    <AdminMenu>
      <Link to='work/new-category'>
        <Button group>New Category</Button>
      </Link>
      <Link to='/work/all'>
        <Button>All Art</Button>
      </Link>
      <Link to='/work/sort'>
        <Button>Sort Categories</Button>
      </Link>
    </AdminMenu>
  );

  const deleteCategory = (id) => {
    const newCategories = categories.filter(c => c.id !== id);
    setCategories(newCategories);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?"))
      axios.delete(`/api/admin/categories/categories/${id}`)
        .then( () => {
          setFlash("Category Deleted", "green");
          deleteCategory(id);
        })
        .catch( err => {
          setFlash(err.response, "red");
        })
  };

  return (
    <CategoriesContainer>
      { user && displayAdminMenu() }
      <Grid columns='equal' centered>
        { displayCategories() }
      </Grid>
    </CategoriesContainer>
  );
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

export default Categories;
