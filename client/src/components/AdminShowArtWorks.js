import React from 'react';
import axios from 'axios';
import Lightbox from 'react-images';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';
import { formatArt, } from '../helpers/artWorks';
import { getCategoryTitle, } from '../helpers/artWorks';
import { setFlash, } from '../actions/flash';
import { Header, StyledContainer, } from '../styles/shared';
import { Grid, Image, Transition, } from 'semantic-ui-react';

class AdminShowArtWorks extends React.Component {
  state = { artWorks: [], categoryTitle: '', currentImage: 0, erroredImages: [], lightboxIsOpen: false, };

  componentDidMount() {
    const { match: { params: { work_title, }, }, } = this.props;
    
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
  
  closeLightbox = () => this.setState({ currentImage: 0, lightboxIsOpen: false, });

  displayArtWorks = () => {
    const { artWorks, erroredImages, visible, } = this.state;

    if (!artWorks) return;

    return artWorks.map( (artWork, i) => {
      return erroredImages.includes(artWork.id) ?
        null
        :
        <Grid.Column key={artWork.id} mobile={8} tablet={4} computer={4} style={styles.flex}>
          <Transition visible={visible} animation='fade' duration={2000}>
            {/* <Link to={`poop`} rel="noopener noreferrer"> */}
              <Image
                alt={artWork.title}
                src={artWork.src}
                href={artWork.src}
                onError={() => this.handleImageError(artWork.id)}
                fluid
              />
            {/* </Link> */}
          </Transition>
        </Grid.Column>
    });
  };

  gotoImage = (index) => this.setState({ currentImage: index, });

  gotoNext = () => this.setState({ currentImage: this.state.currentImage + 1, });

  gotoPrevious = () => this.setState({ currentImage: this.state.currentImage - 1, });

  handleImageError = (id) => this.setState({ erroredImages: [...this.state.erroredImages, id], });

  openLightbox = (index, event) => {
    event.preventDefault();
    this.setState({ currentImage: index, lightboxIsOpen: true, });
  };

  render() {
    const { artWorks, categoryTitle, currentImage, lightboxIsOpen, } = this.state;

    return(
      <StyledContainer>
        <Header primary>{ categoryTitle }</Header>
        <Grid>
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

const styles = {
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default connect()(AdminShowArtWorks);
