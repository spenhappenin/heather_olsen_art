import React from 'react';
import AdminArtWorks from './admin/AdminArtWorks';
import ArtWorkEditForm from './admin/ArtWorkEditForm';
import ArtWorkNewForm from './admin/ArtWorkNewForm';
import ProtectedRoute from './ProtectedRoute';
import { connect } from 'react-redux';
import { fetchComissions } from '../actions/comissions';
import { validateToken } from '../actions/auth';
import { Dimmer, Loader } from 'semantic-ui-react';

class FetchComissions extends React.Component {
  state = { loaded: false }

  setLoaded = () => this.setState({ loaded: true });

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchComissions());
  }

  render() {
    return (
      <div>
        <ProtectedRoute
          exact
          path='/admin-comissions'
          component={AdminArtWorks}
          fetchArtWorks={fetchComissions}
          title='Comissions'
          type='comission'
        />
        <ProtectedRoute
          exact
          path='/admin-comissions/:id'
          component={ArtWorkEditForm}
          fetchArtWorks={fetchComissions}
          title='Comissions'
          type='comission'
        />
      </div>
    )
    
  }
}

export default connect()(FetchComissions);