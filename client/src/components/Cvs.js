import React from 'react';
import { connect } from 'react-redux';
import { fetchCvs } from '../actions/cvs';
import { StyledContainer } from '../styles/shared';
import { Container, Header } from 'semantic-ui-react';

class Cvs extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCvs());
  }
  
  displayCvs = () => {
    return this.props.cvs.map( cv => 
      <p key={cv.id}>
        {cv.cv_year} - { cv.title } - { cv.cv_type }
      </p>
    )
  }

  render() {
    return(
      <Container as={StyledContainer}>
        <Header as='h1'>Curriculum Vitae</Header>
        { this.displayCvs() }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { cvs: state.cvs };
}

export default connect(mapStateToProps)(Cvs);