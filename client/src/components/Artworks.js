// import React, { useState, useEffect, } from "react";
// import axios from "axios";
// import Lightbox from "react-images";
// import styled from "styled-components";
// import { useWindowWidth, } from "./hooks/WindowWidth";
// import { formatArt, } from "../helpers/artwork";
// import { getCategoryTitle, } from "../helpers/artwork";
// import { Header, StyledContainer, } from "../styles/shared";

// const Artworks = (props) => {
//   const [artworks, setArtworks] = useState([]);
//   const [categoryTitle, setCategoryTitle] = useState("");
//   const [currentImage, setCurrentImage] = useState(0);
//   const [erroredImages, setErroredImages] = useState([]);
//   const [lightboxIsOpen, setLightboxIsOpen] = useState(false);

//   const windowWidth = useWindowWidth();

//   useEffect(() => {
//     debugger
//     const { match: { params: { work_title, }, }, } = props;
//     axios.get(`/api/artworks?category=${work_title}`)
//       .then( res => {      
//         debugger
//         let art = [];
//         res.data.map( a => art.push(formatArt(a)) );
//         setArtworks(art);
//         setArtworks(getCategoryTitle(work_title));
//       })
//       .catch( err => {
//         // AUTH: Add Flash
//         console.log(err.response);
//       })
//   }, []);

//   const closeLightbox = () => {
//     setCurrentImage(0);
//     setLightboxIsOpen(false);
//   };

//   const gotoImage = (index) => setCurrentImage(index);

//   const gotoNext = () => setCurrentImage(currentImage + 1);

//   const gotoPrevious = () => setCurrentImage(currentImage - 1);

//   const handleImageError = (id) => setErroredImages([...erroredImages, id]);

//   const openLightbox = (index, event) => {
//     event.preventDefault();
//     setCurrentImage(index);
//     setLightboxIsOpen(true);
//   };

//   const displayArtworks = () => {
//     if (artworks.length === 0) {
//       debugger
//       return null;
//     } else {
//       debugger
//       return artworks.map((artwork, i) => {
//         return erroredImages.includes(artwork.id) ?
//           null
//           :
//           <Column key={i}>
//             <Image
//               alt={artwork.title}
//               srcSet={artwork.srcSet}
//               href={artwork.src}
//               onClick={(e) => openLightbox(i, e)}
//               onError={() => handleImageError(artwork.id)}
//               style={{ width: "100%", }}
//             />
//           </Column>
//       });
//     }
//   };

//   return (
//     <StyledContainer>
//       <Header primary>{categoryTitle}</Header>
//       <Grid width={windowWidth}>
//         { displayArtworks() }
//         <Lightbox
//           currentImage={currentImage}
//           images={artworks}
//           isOpen={lightboxIsOpen}
//           // onClickImage={handleClickImage}
//           onClickNext={gotoNext}
//           onClickPrev={gotoPrevious}
//           onClickThumbnail={gotoImage}
//           onClose={closeLightbox}
//           preloadNextImage
//         />
//       </Grid>
//     </StyledContainer>
//   );
// }

// const Grid = styled.div`
//   display: grid;
//   grid-gap: 25px;
//   grid-template-columns: ${ props => `repeat(${props.width <= 750 ? 2 : 4}, 1fr)`};
// `;

// const Column = styled.div`
//   align-items: center;
//   display: flex;
//   justify-content: center;
// `;

// const Image = styled.img`
//   width: 100%;
// `;

// export default Artworks;



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
    axios.get(`/api/artworks?category=${work_title}`)
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
          <Image
            alt={artwork.title}
            srcSet={artwork.srcSet}
            href={artwork.src}
            onClick={(e) => this.openLightbox(i, e)}
            onError={() => this.handleImageError(artwork.id)}
            style={{ width: '100%' }}
          />
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
`;

const Column = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
`;

export default Artworks;