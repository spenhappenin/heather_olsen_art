import React from 'react';
import Copyright from '../shared/Copyright';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DimmerContainer, StyledContainer } from '../../styles/shared';
import { Button, Dimmer, Grid, Header, Icon, Image, Loader, Segment, Transition } from 'semantic-ui-react';

class AdminArtWorks extends React.Component {
  state = { visible: false, loaded: false };

  componentDidMount() {
    this.setState({ visible: !this.state.visible });
  }

  setLoaded = () => this.setState({ loaded: true });

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    if (nextProps.title !== this.props.title)
      dispatch(nextProps.fetchArtWorks(this.setLoaded()));
  }

  displayArtWorks = () => {
    return this.props.works.map( work =>
      <Grid.Column mobile={8} tablet={4} computer={3} key={work.id}>
        <Transition visible={this.state.visible} animation='fade' duration={1000}>
          <Link to={`${this.props.path}/${work.id}`}>
            <Image 
              src={work.src} 
              onError={(e) => { e.target.src = "http://www.aspga.com/wp-content/uploads/2016/10/ImageNotAvailable.png" }} 
              fluid 
            />
          </Link>
        </Transition>
      </Grid.Column>
    )
  }

  render() {
    if(this.state.loaded) {
      return(
        <Segment as={StyledContainer} basic>
          <Header as='h1'>{this.props.title}</Header>
          <Link to={`${this.props.path}/new`}><Button color='black'><Icon name='add' />Add</Button></Link>
          <br />
          <br />
          <Grid>
            {this.displayArtWorks()}
          </Grid>
          <Copyright />
        </Segment>
      )
    } else {
      return(
        <DimmerContainer>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </DimmerContainer>
      )
    }
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