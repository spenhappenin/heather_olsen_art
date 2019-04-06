import React from 'react';
import axios from 'axios';
import Cvs from './cvs/Cvs';
import AdminCvs from './admin/AdminCvs';
import CvNewForm from './admin/CvNewForm';
import { Route, Switch, } from 'react-router-dom';

class FetchCvs extends React.Component {
  state = { cvs: [], };
  
  componentDidMount() {
    const { dispatch, } = this.props;

    axios.get('/api/cvs')
      .then( res => {
        const { data: cvs, headers, } = res;
        this.setState({ cvs, });
      })
      .catch( err => {
        // AUTH: Add Flash
        console.log(err.response);
      })
  };

  createCv = (cvs) => this.setState({ cvs, });

  updateCv = (cv) => {
    let cvs = this.state.cvs.map( c => {
      if (c.id === cv.id)
        return c = cv
      return c;
    });
    this.setState({ cvs, });
  };

  deleteCv = (id) => {
    const cvs = this.state.cvs.filter( c => c.id !== id)
    this.setState({ cvs, });
  };

  render() {
    return(
      <Switch>
        {
          this.props.user.id && 
            <Route 
              exact 
              path='/admin-cv/new'
              render={ props => <CvNewForm create={this.createCv} /> } 
            />
        }
        {
          this.props.user.id ?
            <Route 
              exact 
              path='/admin-cv' 
              render={ props => (
                <AdminCvs
                  cvs={this.state.cvs}
                  update={this.updateCv} 
                  delete={this.deleteCv} 
                />
              )} 
            />
          :
            <Route exact path='/cv' render={ props => <Cvs cvs={this.state.cvs} /> } />
        }
      </Switch>
    );
  };
};

// const mapStateToProps = (state) => {
//   return { user: state.user, }
// }

export default FetchCvs;
