import React, { useState, useEffect, useContext, } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "react-responsive-modal";
import { FiZoomIn, } from 'react-icons/fi';
import { Link, } from "react-router-dom";

import { CartContext, } from "../providers/CartProvider";
import { FlashContext, } from "../providers/FlashProvider";
import { formatPrice, } from "../helpers/cart";
import { useWindowWidth, } from "./hooks/useWindowWidth";
import { Header, StyledContainer, } from "../styles/shared";

const AddToCart = ({ match, history, }) => {
  const { setFlash, } = useContext(FlashContext);
  const { addToCart, cart, } = useContext(CartContext);

  const [artwork, setArtwork] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const width = useWindowWidth();

  useEffect( () => {
    axios.get(`/api/artworks/artworks/${match.params.id}`)
      .then( res => {
        setArtwork(res.data.artwork);
      })
  }, []);

  useEffect( () => {
    const cartItem = cart.find(c => c.id === artwork.id);
    if (cartItem) {
      if (cartItem.id === artwork.id)
        setDisabled(true);
      else
        setDisabled(false);
    }
  })

  const handleClick = () => {
    setFlash(`"${artwork.title}" Added To Cart`, "green");
    addToCart(artwork);
  }

  const displayButtonText = () => {
    const cartItem = cart.find( c => c.id === artwork.id );
    if (cartItem) {
      if (cartItem.id === artwork.id)
        return "In Cart";
      else
        return "Add To Cart";
    }
    return "Add To Cart";
  };

  return (
    <StyledContainer>
      <Link to="/butterflies">
        <Button>Back</Button>
      </Link>
      <br />
      <br />
      <br />
      <MainContainer width={width}>
        <SubContainer imageSub>
          <Image src={artwork.url} />
          <ImageLink onClick={() => setModalOpen(true)}>
            <FiZoomIn style={{ marginRight: "5px", }} />
            Enlarge Image
          </ImageLink>
        </SubContainer>
        <SubContainer>
          <Header primary>{artwork.title}</Header>
          <CartText>
            { artwork.status === "sold" ?
              "SOLD"
            :
              `$${ formatPrice(artwork.price) }`
            }
          </CartText>
          <div style={{ display: "flex", }}>
            <CartText style={{ marginRight: "5px", }}>{ artwork.dimensions }</CartText>
            <CartText>{artwork.medium} on {artwork.surface}</CartText>
          </div>
          <br />
          <hr />
          <br />
          <div>
            <h5>CONTRACT:</h5>
            <p>Signed Artist Contract required. Will be provided upon purchase or at request. A copy of the contract with the Certificate of Authenticity will accompany the painting. </p>
          </div>
          <br />
          <hr />
          <br />
          <div>
            <h5>SHIPPING:</h5>
            <CartText>Ships within 2-3 business days.</CartText>
            <CartText>Sorry but no refunds or exchanges.</CartText>
          </div>
          <br />
          <hr />
          <br />
          {/* {
            artwork.status !== "sold" && */}
              <Button
                disabled={disabled}
                style={{ width: "100%", }}
                onClick={handleClick}
              >
                { displayButtonText() }
              </Button>
          {/* } */}
        </SubContainer>
      </MainContainer>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} center>
        <Image src={artwork.url} />
      </Modal>
    </StyledContainer>
  );
};

const CartText = styled.p`
  color: #575757;
`;

const Button = styled.button`
  color: #fff;
  transition: background-color 0.3s ease;
  background-color: ${ props => props.modal ? "#557c8c" : "#272727"};
  background: ${ props => props.disabled ? "#595959" : "#272727" };
  padding: 15px 40px 15px 40px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 11px;
  cursor: ${ props => !props.disabled && "pointer"};
  margin-right: ${ props => props.group ? "15px" : null};

  &:focus {
    outline: 0;
  }
  &:hover {
    transition: ${ props => props.disabled && "background-color 0.3s ease" };
    background: ${ props => props.disabled ? "#595959" : "#595959"};
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: ${ props => props.width <= 640 ? "column" : "row" };
`;

const Image = styled.img`
  width: 90%;
`;

const SubContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${ props => props.imageSub ? "flex-end" : "flex-start"};
  margin-right: ${ props => props.imageSub ? "3rem" : 0 };
`;

const ImageLink = styled.p`
  padding: 1rem;
  font-size: 16px;
  color: black;
  cursor: pointer;
`;

export default AddToCart;
