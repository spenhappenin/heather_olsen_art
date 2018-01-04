import React from 'react';
import AdminCv from './AdminCv';
import Copyright from '../Copyright';
import { connect } from 'react-redux';
import { fetchCvs } from '../../actions/cvs';
import { Link } from 'react-router-dom';
import { StyledContainer } from '../../styles/shared';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

class AdminCvs extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCvs());
  }

  displayCvs = (type) => {
    return this.props.cvs.map(cv => {
      if (cv.cv_type === type)
        return <AdminCv key={cv.id} cv={cv} />
    })
  }

  render() {
    return (
      <Segment as={StyledContainer} basic>
        <Header as='h1'>Curriculum Vitae</Header>
        <Link to='/admin-cv/new'><Button color='black'><Icon name='add' color='white' />Add</Button></Link>
        <Header as='h4'>Juried Exhibitions</Header>
        {this.displayCvs('exhibition')}
        <Header as='h4'>Festivals and Events</Header>
        {this.displayCvs('festival')}
        <Header as='h4'>Awards and Certificates</Header>
        {this.displayCvs('award')}
        <Header as='h4'>Current Representation</Header>
        {this.displayCvs('current_rep')}
        <Header as='h4'>Education</Header>
        {this.displayCvs('education')}
        <Header as='h4'>Website and Social Media</Header>
        <Segment basic>
          <p>www.heatherolsenart.com</p>
          <p><a href='https://www.instagram.com/heatherolsenart/' target="_blank">IG: @heatherolsenart</a></p>
          <p><a href='https://www.facebook.com/heatherolsenart/' target="_blank">www.facebook.com/heatherolsenart</a></p>
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