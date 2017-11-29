import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StyledContainer } from '../../styles/shared';
import { Button, Container, Grid, Header, Icon, Image, Transition } from 'semantic-ui-react';

class AdminArtWorks extends React.Component {
  state = { visible: false };

  componentDidMount() {
    const { fetchArtWorks, dispatch } = this.props;
    dispatch(fetchArtWorks());
    this.setState({ visible: !this.state.visible })
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.title !== this.props.title)
      dispatch(nextProps.fetchArtWorks());
  }

  displayArtWorks = () => {
    return this.props.works.map(comission =>
      <Grid.Column width={4} key={comission.id}>
        <Transition visible={this.state.visible} animation='fade' duration={2000}>
          <Image src={comission.url} fluid />
        </Transition>
      </Grid.Column>
    )
  }

  render() {
    return (
      <Container as={StyledContainer}>
        <Header as='h1'>{this.props.title}</Header>
        <Link to={`${this.props.path}/new`}><Button><Icon name='add' color='green' />Add</Button></Link>
        <br />
        <br />
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

export default connect(mapStateToProps)(AdminArtWorks);