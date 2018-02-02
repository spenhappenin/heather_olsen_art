import React from 'react';
import Copyright from '../shared/Copyright';
import Lightbox from 'react-images';
import { connect } from 'react-redux';
import { StyledContainer, DimmerContainer } from '../../styles/shared';
import { Dimmer, Grid, Header, Image, Loader, Segment, Transition } from 'semantic-ui-react';

class ArtWorks extends React.Component {
  state = { currentImage: 0, lightboxIsOpen: false, loaded: false };

  componentDidMount() {
    const { fetchArtWorks, dispatch } = this.props;
    dispatch(fetchArtWorks(this.setLoaded()));
  }

  componentWillReceiveProps(nextProps){
    const { dispatch } = this.props;
    if(nextProps.title !== this.props.title)
      dispatch(nextProps.fetchArtWorks());
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
      <Grid.Column mobile={8} tablet={4} computer={3} key={artWork.id}>
        <Transition visible={this.state.visible} animation='fade' duration={2000}>
          <Image src={artWork.src} href={artWork.src} onClick={(e) => this.openLightbox(i, e)} fluid />
        </Transition>
      </Grid.Column>
    )
  }

  render() {
    if(this.state.loaded) {
      return (
        <Segment as={StyledContainer} basic>
          <Header as='h1'>{this.props.title}</Header>
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