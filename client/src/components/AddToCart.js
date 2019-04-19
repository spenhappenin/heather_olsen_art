import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, } from "react-router-dom";
import { useWindowWidth, } from "./hooks/WindowWidth";
import { StyledContainer, Header, Button, } from "../styles/shared";

const AddToCart = (props) => {
  const [artwork, setArtwork] = useState({});
  const width = useWindowWidth();

  useEffect( () => {
    axios.get(`/api/single_artwork/${props.match.params.id}`)
      .then( res => {
        setArtwork(res.data.artwork);
      })
  }, []);

  const formatPrice = (p) => {
    let price = Number.parseFloat(p).toFixed(2);
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <StyledContainer>
      <MainContainer width={width}>
        <SubContainer>
          <Image src={artwork.url} />
        </SubContainer>
        <SubContainer>
          <Header primary>{artwork.title}</Header>
          <h3>${ formatPrice(artwork.price) }</h3>
          <Button style={{ width: "100%", }}>Add To Cart</Button>
          <h5>Details</h5>
          <div>
            <p>{artwork.dimensions}</p>
            <p>{ artwork.medium } on { artwork.surface }</p>
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
            <p>Shipping costs vary according to weight, size, destination, and value. In order to best serve each individual client shipping costs will be sent in a separate invoice, calculating the best option for the buyer.</p>
          </div>
          <br />
          <hr />
          <br />
          <div>
            <h5>CUSTOM ORDER REQUESTS:</h5>
            <p>For custom horse or pet portrait oil painting inquiries click link below for info.</p>
            <a href="https://google.com">https://test-link.com</a>
          </div>
        </SubContainer>
      </MainContainer>
    </StyledContainer>
  )
}

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
