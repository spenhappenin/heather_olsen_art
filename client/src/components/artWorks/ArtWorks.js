import React from 'react';
import Copyright from '../shared/Copyright';
import Lightbox from 'react-images';
import { connect } from 'react-redux';
import { Header } from '../../styles/shared';
import { DimmerContainer, StyledContainer } from '../../styles/shared';
import { Dimmer, Grid, Image, Loader, Segment, Transition } from 'semantic-ui-react';

class ArtWorks extends React.Component {
  state = { currentImage: 0, lightboxIsOpen: false, loaded: false };

  componentDidMount() {
    const { fetchArtWorks, dispatch } = this.props;
    dispatch(fetchArtWorks(this.setLoaded()));
  }

  componentWillReceiveProps(nextProps){
    const { dispatch } = this.props;
    if(nextProps.title !== this.props.title)
      dispatch(nextProps.fetchArtWorks(this.setLoaded()));
  }

  setLoaded = () => this.setState({ loaded: true });

  openLightbox = (index, event) => {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  gotoImage = (index) => {
    this.setState({
      currentImage: index,
    });
  }

  handleClickImage = () => {
    if(this.state.currentImage === this.props.works.length - 1) return;
    this.gotoNext();
  }

  displayArtWorks = () => {
    const { works } = this.props;
    if(!works) return;
    return works.map( (artWork, i) =>
      <Grid.Column key={artWork.id} mobile={8} tablet={4} computer={4} style={styles.flex}>
        <Transition visible={this.state.visible} animation='fade' duration={2000}>
            <Image 
              alt={artWork.title}
              src={artWork.src} 
              href={artWork.src} 
              onClick={(e) => this.openLightbox(i, e)} 
              onError={(e) => { e.target.src ="https://res.cloudinary.com/dtb6lx1s4/image/upload/v1518813497/ImageNotAvailable_owzy6a.png" }}
              fluid 
              />
        </Transition>
      </Grid.Column>
    )
  }

  render() {
    if(this.state.loaded) {
      return (
        <Segment as={StyledContainer} basic>
          <Header primary>{this.props.title}</Header>
          <Grid>
            {this.displayArtWorks()}
            <Lightbox
              currentImage={this.state.currentImage}
              images={this.props.works}
              isOpen={this.state.lightboxIsOpen}
              onClickImage={this.handleClickImage}
              onClickNext={this.gotoNext}
              onClickPrev={this.gotoPrevious}
              onClickThumbnail={this.gotoImage}
              onClose={this.closeLightbox}
              />
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

const styles = {
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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