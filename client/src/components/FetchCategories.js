import React from 'react';
import axios from 'axios';
import ArtworkNew from './ArtworkNew';
import AllArtwork from './AllArtwork';
import Categories from './Categories';
import CategoryForm from './CategoryForm';
import ProtectedRoute from './ProtectedRoute';
import ShowArtWorks from './ShowArtWorks';
import SingleArtWork from './SingleArtWork';
import AdminShowArtWorks from './AdminShowArtWorks';
import { connect, } from 'react-redux';
import { DimmerContainer, } from '../styles/shared';
import { Route, Switch, } from 'react-router-dom';
import { Dimmer, Loader, } from 'semantic-ui-react';

class FetchCategories extends React.Component {
  state = { categories: [], loaded: false, };

  componentDidMount() {
    axios.get('/api/works')
      .then( res => {
        this.setState({ categories: res.data, loaded: true, });
      })
      .catch( err => {
        // TODO: Add error handling
        console.log(err.response)
      })
  };

  createCategory = (category) => {
    this.setState({ categories: [...this.state.categories, category] });
  };

  updateCategory = (category) => {
    let categories = this.state.categories.map( c => {
      if (c.id === category.id)
        return c = category
      return c;
    })
    this.setState({ categories, });
  };

  deleteCategory = (id) => {
    const categories = this.state.categories.filter( c => c.id !== id)
    this.setState({ categories, });
  };

  render() {
    if(!this.state.loaded) {
      return(
        <DimmerContainer>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </DimmerContainer>
      );
    };

    return(
      <Switch>
        <Route 
          exact 
          path='/work' 
          render={ props => (
            <Categories categories={this.state.categories} delete={this.deleteCategory} />
          )} 
        />
        {
          this.props.user.id && 
          <Route 
            exact 
            path='/work/new-category' 
            render={ props => (
              <CategoryForm 
                create={this.createCategory}
                update={this.updateCategory} 
              />
            )} 
          />
        }
        {
          this.props.user.id && 
          <Route 
            exact 
            path='/work/edit-category/:id'
            render={ props => (
              <CategoryForm 
                create={this.createCategory}
                update={this.updateCategory} 
                delete={this.deleteCategory}
              />
            )} 
          />
        }
        <ProtectedRoute exact path='/work/all' component={AllArtwork} />
        {
          this.props.user.id ?
            <ProtectedRoute exact path='/work/:work_title' component={AdminShowArtWorks} />
          :
            <Route exact path='/work/:work_title' component={ShowArtWorks} />
        }
        <ProtectedRoute exact path='/work/:work_title/new' component={ArtworkNew} />
        <ProtectedRoute exact path='/work/edit/:id' component={SingleArtWork} />
      </Switch>
    );
  };
};

const mapStateToProps = (state) => {
  return { user: state.user, };
};

export default connect(mapStateToProps)(FetchCategories);
