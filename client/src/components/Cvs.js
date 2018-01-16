import React from 'react';
import Copyright from './Copyright';
import Cv from './Cv';
import { connect } from 'react-redux';
import { fetchCvs } from '../actions/cvs';
import { StyledContainer } from '../styles/shared';
import { Header, Segment } from 'semantic-ui-react';
import { CvItem } from '../styles/cv';

class Cvs extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCvs());
  }

  displayCvs = (type) => {
    return this.props.cvs.map( cv => {
      if(cv.cv_type === type)
        return <Cv key={cv.id} cv={cv} />
    })
  }

  render() {
    return(
      <Segment as={StyledContainer} basic>
        <Header as='h1'>Curriculum Vitae</Header>
        <Header as='h4'>Juried Exhibitions</Header>
        <Segment basic>
          { this.displayCvs('exhibition') }
        </Segment>
        <Header as='h4'>Festivals and Events</Header>
        <Segment basic>
          {this.displayCvs('festival')}
        </Segment>
        <Header as='h4'>Awards and Certificates</Header>
        <Segment basic>
          {this.displayCvs('award')}
        </Segment>
        <Header as='h4'>Current Representation</Header>
        <Segment basic>
          {this.displayCvs('current_rep')}
        </Segment>
        <Header as='h4'>Education</Header>
         <Segment basic> 
          {this.displayCvs('education')}
        </Segment>
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

export default connect(mapStateToProps)(Cvs);