import React from 'react';
import AdminCv from './AdminCv';
import Copyright from '../shared/Copyright';
import { connect } from 'react-redux';
import { fetchCvs } from '../../actions/cvs';
import { Header } from '../../styles/shared';
import { Link } from 'react-router-dom';
import { Button, StyledContainer } from '../../styles/shared';
import { Segment } from 'semantic-ui-react';

class AdminCvs extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCvs());
  }

  displayCvs = (type) => {
    const { cvs } = this.props;
    return cvs.map( cv => {
      if(cv.cv_type === type) {
        return <AdminCv key={cv.id} cv={cv} />
      } else {
        return null;
      }
    })
  }

  render() {
    return (
      <Segment as={StyledContainer} basic>
        <Header primary>Curriculum Vitae</Header>
        <Link to='/admin-cv/new'><Button>New</Button></Link>
        <h4>Juried Exhibitions</h4>
        { this.displayCvs('exhibition') }
        <h4>Festivals and Events</h4>
        { this.displayCvs('festival') }
        <h4>Awards and Certificates</h4>
        { this.displayCvs('award') }
        <h4>Current Representation</h4>
        { this.displayCvs('current_rep') }
        <h4>Education</h4>
        { this.displayCvs('education') }
        <h4>Website and Social Media</h4>
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
    )
  }
}

const mapStateToProps = (state) => {
  return { cvs: state.cvs };
}

export default connect(mapStateToProps)(AdminCvs);