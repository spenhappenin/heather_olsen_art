import React from 'react';
import axios from 'axios';
import Lightbox from 'react-images';
import styled from 'styled-components';
import { connect, } from 'react-redux';
import { formatArt, } from '../helpers/artWorks';
import { getCategoryTitle, } from '../helpers/artWorks';
import { setFlash, } from '../actions/flash';
import { Header, StyledContainer, } from '../styles/shared';
import { Image, Transition, } from 'semantic-ui-react';

class ShowArtWorks extends React.Component {
  state = { 
    artWorks: [], 
    categoryTitle: '', 
    currentImage: 0, 
    erroredImages: [], 
    lightboxIsOpen: false, 
    windowWidth: window.innerWidth, 
  };

  componentDidMount() {
    const { match: { params: { work_title, }, }, } = this.props;

    window.addEventListener('resize', this.handleResize);
    axios.get(`/api/artworks?category=${work_title}`)
      .then( res => {
        const art = [];
        res.data.map( a => art.push(formatArt(a)));
        this.setState({ artWorks: art, categoryTitle: getCategoryTitle(work_title), });
      })
      .catch( err => {
        this.props.dispatch(setFlash('An error has occured, please try again later.', 'red'))
      })
  };
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  };
  
  closeLightbox = () => this.setState({ currentImage: 0, lightboxIsOpen: false, });

  displayArtWorks = () => {
    const { artWorks, erroredImages, visible, } = this.state;

    if (!artWorks) return;

    return artWorks.map( (artWork, i) => {
      return erroredImages.includes(artWork.id) ?
        null
      :
        <Column>
          <Transition visible={visible} animation='fade' duration={2000}>
            <Image
              alt={artWork.title}
              src={artWork.src}
              href={artWork.src}
              onClick={(e) => this.openLightbox(i, e)}
              onError={() => this.handleImageError(artWork.id)}
              fluid
              style={{ border: '1px solid red !important', }}
            />
          </Transition>
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
    const { artWorks, categoryTitle, currentImage, lightboxIsOpen, windowWidth, } = this.state;

    return(
      <StyledContainer>
        <Header primary>{ categoryTitle }</Header>
        <Grid width={windowWidth}>
          { this.displayArtWorks() }
          <Lightbox
            currentImage={currentImage}
            images={artWorks}
            isOpen={lightboxIsOpen}
            onClickImage={this.handleClickImage}
            onClickNext={this.gotoNext}
            onClickPrev={this.gotoPrevious}
            onClickThumbnail={this.gotoImage}
            onClose={this.closeLightbox}
          />
        </Grid>
      </StyledContainer>
    );
  };
};

const Grid = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: ${ props => `repeat(${props.width <= 750 ? 2 : 4}, 1fr)` };
`;

const Column = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

export default connect()(ShowArtWorks);
