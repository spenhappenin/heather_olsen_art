import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Image, Transition } from 'semantic-ui-react';

class ArtWorks extends React.Component {
  state = { visible: false };

  componentDidMount() {
    const { fetchArtWorks, dispatch } = this.props;
    dispatch(fetchArtWorks());
    this.setState({visible: !this.state.visible})
  }

  componentWillReceiveProps(nextProps){
    const { dispatch } = this.props;
    if(nextProps.title !== this.props.title)
      dispatch(nextProps.fetchArtWorks());
  }

  displayArtWorks = () => {
    return this.props.works.map(comission =>
      <Grid.Column width={4} key={comission.id}>
        <Transition visible={this.state.visible} animation='fly right' duration={1000}>
          <Image src={comission.url} fluid />
        </Transition>
      </Grid.Column>
    )
  }

  render() {
    return (
      <Container>
        <Header as='h1'>{this.props.title}</Header>
        <Grid>
          {this.displayArtWorks()}
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  switch (props.type) {
    case 'comission':
      return { works: state.comissions }
    case 'painting':
      return { works: state.paintings }
    case 'drawing':
      return { works: state.drawings }
    default:
      return {};
  }
}

export default connect(mapStateToProps)(ArtWorks);