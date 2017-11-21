import React from 'react';
import { connect } from 'react-redux';
import { fetchCvs } from '../actions/cvs';
import { Container, Header } from 'semantic-ui-react';

class Cvs extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCvs());
  }
  
  displayCvs = () => {
    return this.props.cvs.map( cv => 
      <p>
        {cv.cv_year} - { cv.title } - { cv.cv_type }
      </p>
    )
  }

  render() {
    return(
      <Container style={styles.container}>
        <Header as='h1'>Curriculum Vitae</Header>
        { this.displayCvs() }
      </Container>
    )
  }
}

const styles = {
  container: {
    marginBottom: '100px',
    marginTop: '50px'
  }
}

const mapStateToProps = (state) => {
  return { cvs: state.cvs };
}

export default connect(mapStateToProps)(Cvs);