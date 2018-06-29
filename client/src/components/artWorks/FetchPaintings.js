import React from 'react';
import AdminArtWorks from '../admin/AdminArtWorks';
import ArtWorkEditForm from '../admin/ArtWorkEditForm';
import ArtWorkNewForm from '../admin/ArtWorkNewForm';
import ProtectedRoute from '../ProtectedRoute';
import { connect, } from 'react-redux';
import { DimmerContainer, } from '../../styles/shared';
import { fetchPaintings, } from '../../actions/paintings';
import { Switch, } from 'react-router-dom';
import { Dimmer, Loader, } from 'semantic-ui-react';

class FetchPaintings extends React.Component {
  state = { loaded: false, };

  setLoaded = () => this.setState({ loaded: true, });

  componentDidMount() {
    const { currentPage, dispatch, } = this.props;

    dispatch(fetchPaintings(this.setLoaded(), currentPage));
  };

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
    );
  };
};

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage,
    totalPages: state.totalPages,
  };
};

export default connect(mapStateToProps)(FetchPaintings);
