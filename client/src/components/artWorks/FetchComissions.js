import React from 'react';
import AdminArtWorks from '../admin/AdminArtWorks';
import ArtWorkEditForm from '../admin/ArtWorkEditForm';
import ArtWorkNewForm from '../admin/ArtWorkNewForm';
import ProtectedRoute from '../ProtectedRoute';
import { connect } from 'react-redux';
import { DimmerContainer } from '../../styles/shared';
import { fetchComissions } from '../../actions/comissions';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Switch } from 'react-router-dom'

class FetchComissions extends React.Component {
  state = { loaded: false };

  setLoaded = () => this.setState({ loaded: true });

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchComissions(this.setLoaded()));
  }

  render() {
    if(!this.state.loaded) {
      return(
        <DimmerContainer>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </DimmerContainer>
      )
    }
    return (
      <Switch>
        {/* FIXME: This Route isnt working but should */}
        {/* <Route
          exact 
          path='/admin-commisions'
          render={ props => <AdminArtWorks {...props} fetchArtWorks={fetchComissions} title='Comissions' type='commission' /> }
        />   */}
        <ProtectedRoute
          exact
          path='/admin-comissions'
          component={AdminArtWorks}
          fetchArtWorks={fetchComissions}
          title='Comissions'
          type='comission'
        />
        <ProtectedRoute exact path='/admin-comissions/new' component={ArtWorkNewForm} />
        <ProtectedRoute
          exact
          path='/admin-comissions/:id'
          component={ArtWorkEditForm}
          fetchArtWorks={fetchComissions}
          title='Comissions'
          type='comission'
        />
        {/* FIXME: This Route isnt working but should */}
        {/* <Route 
          exact
          path='/admin-comissions/:id'
          render={ props => <ArtWorkEditForm {...props} fetchArtWorks={fetchComissions} title='Comissions' type='comission' /> }
        /> */}
      </Switch>
    )
    
  }
}

export default connect()(FetchComissions);