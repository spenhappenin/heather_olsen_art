import React from 'react';
import Copyright from '../shared/Copyright';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Button, StyledContainer } from '../../styles/shared';
import { Grid, Image, Segment, Transition } from 'semantic-ui-react';

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
        <Transition visible={this.state.visible} animation='fade' duration={1000}>
          <Link to={`${this.props.path}/${work.id}`} rel="noopener noreferrer">
            <Image 
              alt={work.title}
              src={work.src} 
              onError={(e) => { e.target.src = "https://res.cloudinary.com/dtb6lx1s4/image/upload/v1518813497/ImageNotAvailable_owzy6a.png" }} 
              fluid 
            />
          </Link>
        </Transition>
      </Grid.Column>
    )
  }

  render() {
    return(
      <Segment as={StyledContainer} basic>
        <Header primary>{this.props.title}</Header>
        <Link to={`${this.props.path}/new`} rel="noopener noreferrer">
          <Button>New</Button>
        </Link>
        <br />
        <br />
        <Grid>
          {this.displayArtWorks()}
        </Grid>
        <Copyright />
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