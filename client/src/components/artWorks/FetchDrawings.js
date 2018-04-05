import React from 'react';
import AdminArtWorks from '../admin/AdminArtWorks';
import ArtWorkEditForm from '../admin/ArtWorkEditForm';
import ArtWorkNewForm from '../admin/ArtWorkNewForm';
import ProtectedRoute from '../ProtectedRoute';
import { connect, } from 'react-redux';
import { DimmerContainer, } from '../../styles/shared';
import { fetchDrawings, } from '../../actions/drawings';
import { Switch, } from 'react-router-dom'
import { Dimmer, Loader, } from 'semantic-ui-react';

class FetchDrawings extends React.Component {
  state = { loaded: false };

  setLoaded = () => this.setState({ loaded: true });

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDrawings(this.setLoaded()));
  }

  render() {
    if (!this.state.loaded) {
      return (
        <DimmerContainer>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </DimmerContainer>
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