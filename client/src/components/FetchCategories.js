import React from 'react';
import axios from 'axios';
import Categories from './Categories';
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
            <Categories categories={this.state.categories} />
          )} 
        />
      </Switch>
    );
  };
};

export default FetchCategories;
