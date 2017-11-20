import React from 'react';
import { connect } from 'react-redux';
import { fetchComissions } from '../actions/comissions';
import { Container, Grid, Header, Image } from 'semantic-ui-react';

class Comissions extends React.Component {
  state = { loaded: false };

  componentDidMount() {
    this.props.dispatch(fetchComissions());
  }

  toggleLoaded = () => this.setState({loaded: !this.state.loaded});

  displayComissions = () => {
    return this.props.comissions.map( comission => 
      <Grid.Column width={4} key={comission.id}>
        <Image src={comission.url} fluid />
      </Grid.Column>
    )
  }

  render() {
    return(
      <Container>
        <Header as='h1'>Comissions</Header>
        <Grid>
          { this.displayComissions() }
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return { comissions: state.comissions }
}

export default connect(mapStateToProps)(Comissions);