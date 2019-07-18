import React, { useContext, useEffect, useState, } from "react";
import axios from "axios";
import styled from "styled-components";
import { FlashContext, } from "../providers/FlashProvider";
import { useWindowWidth, } from "./hooks/useWindowWidth";
import { Link, } from "react-router-dom";
import { Transition, } from "semantic-ui-react";
import { generateImageUrl, getCategoryTitle, } from "../helpers/artwork";
import { Button, Header, StyledContainer, } from "../styles/shared";

const AdminArtworks = (props) => {
  const [artworks, setArtworks] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [erroredImages, setErroredImages] = useState([]);
  const windowWidth = useWindowWidth();

  const { setFlash, } = useContext(FlashContext);

  useEffect(() => {
    const { match: { params: { work_title, }, }, } = props;

    axios.get(`/api/artworks?category=${work_title}`)
      .then( res => {
        setArtworks(res.data);
        setCategoryTitle(getCategoryTitle(work_title));
      })
      .catch( err => {
        setFlash(err.response, "red");
      })
  }, []);

  const displayArtWorks = () => {
    if (!artworks) return;

    return artworks.map( a => {
      return erroredImages.includes(a.id) ?
        null
      :
        <Column key={a.i}>
          <Transition animation="fade" duration={2000}>
            <Link to={`edit/${a.id}`} rel="noopener noreferrer">
              <Image
                alt={a.title}
                onError={() => handleImageError(a.id)}
                srcSet={[
                  `${generateImageUrl(a.url, 1100)} 1024w`,
                  `${generateImageUrl(a.url, 750)} 750w`
                ]}
              />
            </Link>
          </Transition>
        </Column>
    });
  };

  const handleImageError = (id) => setErroredImages([...erroredImages, id]);

  return (
    <StyledContainer>
      <Header primary>{categoryTitle}</Header>
      <Link to={`${props.path}/new`} rel="noopener noreferrer">
        <Button>New</Button>
      </Link>
      <br />
      <br />
      <Grid width={windowWidth}>
        { displayArtWorks() }
      </Grid>
    </StyledContainer>
  );
};

const Grid = styled.div`
  display: grid;
  grid-gap: 25px;
  /* TODO: Better way to break on mobile? */
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

export default AdminArtworks;
