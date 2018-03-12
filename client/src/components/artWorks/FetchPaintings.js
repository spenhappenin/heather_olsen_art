import React from 'react';
import AdminArtWorks from '../admin/AdminArtWorks';
import ArtWorkEditForm from '../admin/ArtWorkEditForm';
import ArtWorkNewForm from '../admin/ArtWorkNewForm';
import ProtectedRoute from '../ProtectedRoute';
import { connect } from 'react-redux';
import { DimmerContainer } from '../../styles/shared';
import { fetchPaintings } from '../../actions/paintings';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Switch } from 'react-router-dom';

class FetchPaintings extends React.Component {
  state = { loaded: false };

  setLoaded = () => this.setState({ loaded: true });

  componentDidMount() {
    console.log('FetchPaintings did mount')
    const { dispatch } = this.props;
    dispatch(fetchPaintings(this.setLoaded(), 1));
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
          path='/admin-paintings'
          component={AdminArtWorks}
          fetchArtWorks={fetchPaintings}
          title='Paintings'
          type='painting'
        />
        <ProtectedRoute exact path='/admin-paintings/new' component={ArtWorkNewForm} />
        <ProtectedRoute
          exact
          path='/admin-paintings/:id'
          component={ArtWorkEditForm}
          fetchArtWorks={fetchPaintings}
          title='Paintings'
          type='painting'
        />
      </Switch>
    )

  }
}

export default connect()(FetchPaintings);