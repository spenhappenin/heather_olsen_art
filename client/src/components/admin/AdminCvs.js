import React from 'react';
import AdminCv from './AdminCv';
import { connect } from 'react-redux';
import { fetchCvs } from '../../actions/cvs';
import { StyledContainer } from '../../styles/shared';
import { Button, Container, Header, Icon } from 'semantic-ui-react';

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
      <Container as={StyledContainer}>
        <Header as='h1'>Curriculum Vitae</Header>
        <Button color='black'>Add</Button>
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
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { cvs: state.cvs };
}

export default connect(mapStateToProps)(AdminCvs);