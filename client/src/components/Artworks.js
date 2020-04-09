import React from 'react';
import axios from 'axios';
import Lightbox from 'react-images';
import styled from 'styled-components';
import { formatArt, } from '../helpers/artwork';
import { getCategoryTitle, } from '../helpers/artwork';
import { Header, StyledContainer, } from '../styles/shared';

class Artworks extends React.Component {
  state = {
    artworks: [],
    categoryTitle: '',
    currentImage: 0,
    erroredImages: [],
    lightboxIsOpen: false,
    windowWidth: window.innerWidth,
  };

  componentDidMount() {
    const { match: { params: { work_title, }, }, } = this.props;

    window.addEventListener('resize', this.handleResize);
    axios.get(`/api/artworks/artworks?category=${work_title}`)
      .then(res => {
        const art = [];
        res.data.map(a => art.push(formatArt(a)));
        this.setState({ artworks: art, categoryTitle: getCategoryTitle(work_title), });
      })
      .catch(err => {
        console.log(err.response);
      })
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  };

  closeLightbox = () => this.setState({ currentImage: 0, lightboxIsOpen: false, });

  displayArtworks = () => {
    const { artworks, erroredImages, } = this.state;

    if (!artworks) return;

    return artworks.map((artwork, i) => {
      return erroredImages.includes(artwork.id) ?
        null
      :
        <Column key={i}>
          <ImageContainer>
            <Image
              alt={artwork.title}
              srcSet={artwork.srcSet}
              href={artwork.src}
              onClick={(e) => this.openLightbox(i, e)}
              onError={() => this.handleImageError(artwork.id)}              
            />
            <Overlay sold={artwork.status !== "for sale"}></Overlay>
          </ImageContainer>
        </Column>
    });
  };

  gotoImage = (index) => this.setState({ currentImage: index, });

  gotoNext = () => this.setState({ currentImage: this.state.currentImage + 1, });

  gotoPrevious = () => this.setState({ currentImage: this.state.currentImage - 1, });

  handleImageError = (id) => this.setState({ erroredImages: [...this.state.erroredImages, id], });

  handleResize = (e) => this.setState({ windowWidth: window.innerWidth });

  openLightbox = (index, event) => {
    event.preventDefault();
    this.setState({ currentImage: index, lightboxIsOpen: true, });
  };

  render() {
    const { artworks, categoryTitle, currentImage, lightboxIsOpen, windowWidth, } = this.state;

    return (
      <StyledContainer>
        <Header primary>{categoryTitle}</Header>
        <Grid width={windowWidth}>
          {this.displayArtworks()}
          <Lightbox
            currentImage={currentImage}
            images={artworks}
            isOpen={lightboxIsOpen}
            onClickImage={this.handleClickImage}
            onClickNext={this.gotoNext}
            onClickPrev={this.gotoPrevious}
            onClickThumbnail={this.gotoImage}
            onClose={this.closeLightbox}
            preloadNextImage
          />
        </Grid>
      </StyledContainer>
    );
  };
};

const Grid = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: ${ props => `repeat(${props.width <= 750 ? 2 : 4}, 1fr)`};
  position: relative;
`;

const Column = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const ImageContainer = styled.div`
	position: relative;
	display: flex;
	justify-content: flex-end;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  z-index: 2;

  @media (max-width: 800px) {
    max-height: 250px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  color: #f1f1f1;
	background: red;
  width: 10px;
	height: 10px;
	border-radius: 50%;
  opacity: ${ props => props.sold ? 1 : 0};  
	right: 12px;
	bottom: 12px;
  z-index: 3;
`;

export default Artworks;
