import React from 'react';
import Copyright from '../shared/Copyright';
import Cv from './Cv';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../../styles/shared';
import { fetchCvs } from '../../actions/cvs';
import { StyledContainer } from '../../styles/shared';
import { Segment } from 'semantic-ui-react';

class Cvs extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCvs());
  }

  displayCvs = (type) => {
    const { cvs } = this.props;
    return cvs.map( cv => {
      if(cv.cv_type === type)
        return <Cv key={cv.id} cv={cv} />
    })
  }

  render() {
    return(
      <Segment as={StyledContainer} basic>
        <Header primary>Curriculum Vitae</Header>
        <h4>Juried Exhibitions</h4>
        <Segment basic>
          { this.displayCvs('exhibition') }
        </Segment>
        <h4>Festivals and Events</h4>
        <Segment basic>
          {this.displayCvs('festival')}
        </Segment>
        <h4>Awards and Certificates</h4>
        <Segment basic>
          {this.displayCvs('award')}
        </Segment>
        <h4>Current Representation</h4>
        <Segment basic>
          {this.displayCvs('current_rep')}
        </Segment>
        <h4>Education</h4>
         <Segment basic> 
          {this.displayCvs('education')}
        </Segment>
        <h4>Website and Social Media</h4>
        <Segment basic>
          <p>www.heatherolsenart.com</p>
          <p><Link to='https://www.instagram.com/heatherolsenart/' target="_blank">IG: @heatherolsenart</Link></p>
          <p><Link to='https://www.facebook.com/heatherolsenart/' target="_blank">www.facebook.com/heatherolsenart</Link></p> 
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