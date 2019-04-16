import React, { useState, useEffect, useContext, } from 'react';
import { AuthContext, } from "../providers/AuthProvider";
import axios from 'axios';
import Cvs from './cvs/Cvs';
import AdminCvs from './admin/AdminCvs';
import CvNewForm from './admin/CvNewForm';
import { Route, Switch, } from 'react-router-dom';

const FetchCvs = (props) => {
  const [cvs, setCvs] = useState([]);
  const { user, } = useContext(AuthContext);

  useEffect( () => {
    axios.get('/api/cvs')
      .then( res => setCvs(res.data))
      .catch( err => {
        // AUTH: Add Flash
        console.log(err.response);
      })
  }, []);

  const createCv = (cvs) => setCvs({ cvs, });

  const updateCv = (cv) => {
    const updatedCvs = cvs.map( c => {
      if (c.id === cv.id)
        return c = cv
      return c;
    });
    setCvs(updatedCvs);
  };

  const deleteCv = (id) => {
    const updatedCvs = cvs.filter( c => c.id !== id)
    setCvs(updatedCvs);
  };

  return (
    <Switch>
      {
        user &&
        <Route
          exact
          path='/admin-cv/new'
          render={props => <CvNewForm create={createCv} />}
        />
      }
      {
        user ?
          <Route
            exact
            path='/admin-cv'
            render={ props => (
              <AdminCvs
                cvs={cvs}
                update={updateCv}
                delete={deleteCv}
              />
            )}
          />
        :
          <Route exact path='/cv' render={props => <Cvs cvs={cvs} />} />
      }
    </Switch>
  );
}

export default FetchCvs;
