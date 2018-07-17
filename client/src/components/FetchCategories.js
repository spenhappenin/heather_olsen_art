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
            <Categories categories={this.state.categories}  />
          )} 
        />
        {
          this.props.user.id && 
          <Route 
            exact 
            path='/work/new-category' 
            render={ props => (
              <CategoryForm cool='cool' />
            )} 
          />
        }
        {/* <ProtectedRoute exact path='/work/new-category' component={CategoryForm} /> */}
        {/* <Route exact path='/work/new-category' render={ props => (
          <CategoryForm  />
         )} 
        /> */}
        <ProtectedRoute exact path='/work/edit-category/:id' component={CategoryForm} />
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
