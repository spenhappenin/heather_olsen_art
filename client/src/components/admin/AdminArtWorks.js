import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StyledContainer } from '../../styles/shared';
import { Button, Grid, Header, Icon, Image, Segment, Transition } from 'semantic-ui-react';

class AdminArtWorks extends React.Component {
  state = { visible: false };

  componentDidMount() {
    this.setState({ visible: !this.state.visible });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.title !== this.props.title)
      dispatch(nextProps.fetchArtWorks());
  }

  displayArtWorks = () => {
    return this.props.works.map( work =>
      <Grid.Column mobile={8} tablet={4} computer={3} key={work.id}>
        <Transition visible={this.state.visible} animation='fade' duration={2000}>
          <Link to={`${this.props.path}/${work.id}`}><Image src={work.src} fluid /></Link>
        </Transition>
      </Grid.Column>
    )
  }

  render() {
    return (
      <Segment as={StyledContainer} basic>
        <Header as='h1'>{this.props.title}</Header>
        <Link to={`${this.props.path}/new`}><Button color='black'><Icon name='add' />Add</Button></Link>
        <br />
        <br />
        <Grid>
          {this.displayArtWorks()}
        </Grid>
      </Segment>
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