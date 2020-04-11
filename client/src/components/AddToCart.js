import React, { useState, useEffect, useContext, } from "react";
import axios from "axios";
import styled from "styled-components";
import { CartContext, } from "../providers/CartProvider";
import { FlashContext, } from "../providers/FlashProvider";
import { formatPrice, } from "../helpers/cart";
import { useWindowWidth, } from "./hooks/useWindowWidth";
import { StyledContainer, Header, } from "../styles/shared";

const AddToCart = (props) => {
  const { setFlash, } = useContext(FlashContext);
  const { addToCart, cart, } = useContext(CartContext);
  const [artwork, setArtwork] = useState({});
  const [disabled, setDisabled] = useState(false);
  const width = useWindowWidth();
  
  useEffect( () => {
    axios.get(`/api/artworks/artworks/${props.match.params.id}`)
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
      <MainContainer width={width}>
        <SubContainer>
          <Image src={artwork.url} />
        </SubContainer>
        <SubContainer>
          <Header primary>{artwork.title}</Header>
          <CartText>${ formatPrice(artwork.price) }</CartText>
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
          <Button
            disabled={disabled}
            style={{ width: "100%", }}
            onClick={handleClick}
          >
            { displayButtonText() }
          </Button>
        </SubContainer>
      </MainContainer>
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
`;

export default AddToCart;
