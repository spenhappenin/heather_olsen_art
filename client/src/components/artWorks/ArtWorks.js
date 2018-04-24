import React from 'react';
import ArtWork from './ArtWork';
import Copyright from '../shared/Copyright';
import InfiniteScroll from "react-infinite-scroller";
import Lightbox from 'react-images';
import { connect, } from 'react-redux';
import { Header, } from '../../styles/shared';
import { DimmerContainer, StyledContainer, } from '../../styles/shared';
import { Dimmer, Grid, Image, Loader, Segment, Transition, } from 'semantic-ui-react';

class ArtWorks extends React.Component {
  state = { currentImage: 0, erroredImages: [], lightboxIsOpen: false, loaded: false };

  componentDidMount() {
    const { fetchArtWorks, dispatch } = this.props;
    dispatch(fetchArtWorks(this.setLoaded()));
  };

  componentWillReceiveProps(nextProps){
    const { dispatch } = this.props;
    if(nextProps.title !== this.props.title)
      dispatch(nextProps.fetchArtWorks(this.setLoaded()));
  };

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  };

  handleImageError = (id) => this.setState({ erroredImages: [...this.state.erroredImages, id] });
  
  displayArtWorks = () => {
    const { artWorks } = this.props;
    const { erroredImages, visible } = this.state;
    
    if(!artWorks) return;

    return artWorks.map( (artWork, i) => {
      return erroredImages.includes(artWork.id) ? 
        null
      :
        <Grid.Column key={artWork.id} mobile={8} tablet={4} computer={4} style={styles.flex}>
          <Transition visible={visible} animation='fade' duration={2000}>
            <Image
              alt={artWork.title}
              src={artWork.src}
              href={artWork.src}
              onClick={(e) => this.openLightbox(i, e)}
              onError={() => this.handleImageError(artWork.id)}
              fluid
            />
          </Transition>
        </Grid.Column>
    });
  };

  gotoImage = (index) => {
    this.setState({
      currentImage: index,
    });
  };

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  };
  
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  };
  
  handleClickImage = () => {
    const { artWorks } = this.props;
    
    if(this.state.currentImage === artWorks.length - 1) return;
    this.gotoNext();
  };

  loadMore = () => {
    const { currentPage, dispatch, fetchArtWorks } = this.props;
    const { page } = this.state;
    dispatch(fetchArtWorks(this.setLoaded, currentPage + 1, true));
  };

  openLightbox = (index, event) => {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  };

  setLoaded = () => this.setState({ loaded: true });

  render() {
    const { artWorks, currentPage, totalPages } = this.props;

    if(this.state.loaded) {
      return (
        <Segment as={StyledContainer} basic>
          <Header primary>{this.props.title}</Header>
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMore}
            hasMore={currentPage < totalPages}
            loader={<div key="loader">Loading...</div>}
            initialLoad={false}
          >
            <Grid>
              {this.displayArtWorks()}
              <Lightbox
                currentImage={this.state.currentImage}
                images={artWorks}
                isOpen={this.state.lightboxIsOpen}
                onClickImage={this.handleClickImage}
                onClickNext={this.gotoNext}
                onClickPrev={this.gotoPrevious}
                onClickThumbnail={this.gotoImage}
                onClose={this.closeLightbox}
                />
            </Grid>
          </InfiniteScroll>
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
};

const mapStateToProps = (state, props) => {
  switch (props.type) {
    case 'comission':
    return { artWorks: state.comissions, totalPages: state.totalPages, currentPage: state.currentPage }
    case 'painting':
    return { artWorks: state.paintings, totalPages: state.totalPages, currentPage: state.currentPage }
    case 'drawing':
    return { artWorks: state.drawings, totalPages: state.totalPages, currentPage: state.currentPage }
    default:
    return {};
  }
};

const styles = {
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default connect(mapStateToProps)(ArtWorks);