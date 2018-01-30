import React from 'react';
import AdminArtWorks from '../admin/AdminArtWorks';
import ArtWorkEditForm from '../admin/ArtWorkEditForm';
import ArtWorkNewForm from '../admin/ArtWorkNewForm';
import ProtectedRoute from '../ProtectedRoute';
import { connect } from 'react-redux';
import { fetchPaintings } from '../../actions/paintings';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Switch } from 'react-router-dom'

class FetchPaintings extends React.Component {
  state = { loaded: false }

  setLoaded = () => this.setState({ loaded: true });

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPaintings(this.setLoaded));
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