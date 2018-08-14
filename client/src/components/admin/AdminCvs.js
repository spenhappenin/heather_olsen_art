import React from 'react';
import AdminCv from './AdminCv';
import Copyright from '../shared/Copyright';
import { CvHeader, } from '../../styles/cv';
import { Header, } from '../../styles/shared';
import { Link, } from 'react-router-dom';
import { Segment, } from 'semantic-ui-react';
import { Button, StyledContainer, } from '../../styles/shared';

class AdminCvs extends React.Component {

  displayCvType = (type) => {
    const { cvs, } = this.props;
    return cvs.map( cv => {
      if (cv.cv_type === type) {
        return <AdminCv key={cv.id} cv={cv} delete={this.props.delete} update={this.props.update} />
      } else {
        return null;
      };
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
        { this.displayCvType('exhibition') }
        <CvHeader>Festivals and Events</CvHeader>
        { this.displayCvType('festival') }
        <CvHeader>Awards and Certificates</CvHeader>
        { this.displayCvType('award') }
        <CvHeader>Current Representation</CvHeader>
        { this.displayCvType('current_rep') }
        <CvHeader>Education</CvHeader>
        { this.displayCvType('education') }
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

export default AdminCvs;
