import React from 'react';
import AdminCv from './AdminCv';
import axios from 'axios';
import Copyright from '../shared/Copyright';
import { connect, } from 'react-redux';
import { CvHeader, } from '../../styles/cv';
import { Header, } from '../../styles/shared';
import { Link, } from 'react-router-dom';
import { Segment, } from 'semantic-ui-react';
import { setHeaders, } from '../../actions/headers';
import { setFlash, } from '../../actions/flash';
import { Button, StyledContainer, } from '../../styles/shared';

class AdminCvs extends React.Component {
  state = { cvs: [], };

  componentDidMount() {
    const { dispatch, } = this.props;

    axios.get('api/cvs')
      .then( res => {
        const { data: cvs, headers, } = res;
        dispatch(setHeaders(headers));
        this.setState({ cvs, });
      })
      .catch( err => {
        debugger
        dispatch(setHeaders(err.headers));
        dispatch(setFlash('Failed to retrieve CV records at this time. Please try again later.', 'red'));
      })
  };

  displayCvs = (type) => {
    const { cvs, } = this.state;

    return cvs.map( cv => {
      // return cv.cv_type === type ?
      //   <AdminCv key={cv.id} cv={cv} />
      // : 
      //   null
      if (cv.cv_type === type)
        return <AdminCv key={cv.id} cv={cv} />
    });
  }; 

  
  render() {
    return (
      <Segment as={StyledContainer} basic>
        <Header primary>Curriculum Vitae</Header>
        <Link to='/admin-cv/new' rel="noopener noreferrer">
          <Button>New</Button>
        </Link>
        <CvHeader>Juried Exhibitions</CvHeader>
        { this.displayCvs('exhibition') }
        <CvHeader>Festivals and Events</CvHeader>
        { this.displayCvs('festival') }
        <CvHeader>Awards and Certificates</CvHeader>
        { this.displayCvs('award') }
        <CvHeader>Current Representation</CvHeader>
        { this.displayCvs('current_rep') }
        <CvHeader>Education</CvHeader>
        { this.displayCvs('education') }
        <CvHeader>Website and Social Media</CvHeader>
        <Segment basic>
          <p>www.heatherolsenart.com</p>
          <p>
            <a href='https://www.instagram.com/heatherolsenart/' target="_blank" rel="noopener noreferrer">
              IG: @heatherolsenart
            </a>
          </p>
          <p>
            <a href='https://www.facebook.com/heatherolsenart/' target="_blank" rel="noopener noreferrer">
              www.facebook.com/heatherolsenart
            </a>
          </p>
        </Segment>
        <Copyright />
      </Segment>
    );
  };
};

export default connect()(AdminCvs);
