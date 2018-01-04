import React from 'react';
import AdminArtWorks from './admin/AdminArtWorks';
import ArtWorkEditForm from './admin/ArtWorkEditForm';
import ArtWorkNewForm from './admin/ArtWorkNewForm';
import ProtectedRoute from './ProtectedRoute';
import { connect } from 'react-redux';
import { fetchDrawings } from '../actions/drawings';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Switch } from 'react-router-dom'

class FetchDrawings extends React.Component {
  state = { loaded: false }

  setLoaded = () => this.setState({ loaded: true });

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDrawings(this.setLoaded));
  }

  render() {
    if (!this.state.loaded) {
      return (
        <div>
          <br />
          <Dimmer active inverted>
            <Loader inverted size='large'>Loading</Loader>
          </Dimmer>
        </div>
      )
    }
    return (
      <Switch>
        <ProtectedRoute
          exact
          path='/admin-drawings'
          component={AdminArtWorks}
          fetchArtWorks={fetchDrawings}
          title='Drawings'
          type='drawing'
        />
        <ProtectedRoute exact path='/admin-drawings/new' component={ArtWorkNewForm} />
        <ProtectedRoute
          exact
          path='/admin-drawings/:id'
          component={ArtWorkEditForm}
          fetchArtWorks={fetchDrawings}
          title='Drawings'
          type='drawing'
        />
      </Switch>
    )

  }
}

export default connect()(FetchDrawings);