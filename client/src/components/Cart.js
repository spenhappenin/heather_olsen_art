import React, { useContext, } from "react";
import styled from "styled-components";
import { Table, } from "semantic-ui-react";
import { useWindowWidth, } from "./hooks/useWindowWidth";

import { formatPrice, } from "../helpers/cart";
import { StyledContainer, Header, Button, } from "../styles/shared";
import { CartContext, } from "../providers/CartProvider";
import { FlashContext, } from "../providers/FlashProvider";
import clear from "../images/clear.svg";

const Cart = ({ history: { push, } }) => {
  const { cart, removeFromCart, } = useContext(CartContext);
  const { setFlash, } = useContext(FlashContext);
  const windowWidth = useWindowWidth();

  const getTotal = () => {
    let total = 0;
    cart.map( i => total += i.price);
    return formatPrice(total);
  };

  const handleClick = () => {
    (cart.length === 0) ?
      setFlash("Your cart is empty", "red")
    :
      push("/checkout");
  };

  const displayCartItems = () => {
    if (cart.length === 0)
      return (
        <Table.Row style={{ height: "100px", }}>
          <Table.Cell>
            <Header>No Items In Cart</Header>
          </Table.Cell>
        </Table.Row>
      );
    else
      return cart.map( c => (
        <Table.Row key={c.id}>
          <Item>
            <ItemImage src={c.url} />
            <ItemDescription>
              <Header style={{ margin: "0 0 0 20px", }}>{c.title}</Header>
              <p> - {c.dimensions} - {c.medium} on {c.surface}</p>
            </ItemDescription>
          </Item>
          <Table.Cell textAlign="center">${formatPrice(c.price)}</Table.Cell>
          <Table.Cell textAlign="center">1</Table.Cell>
          <Table.Cell textAlign="center">${formatPrice(c.price)}</Table.Cell>
          <Table.Cell textAlign="center">
            <ClearImg src={clear} onClick={() => removeFromCart(c)} />
          </Table.Cell>
        </Table.Row>
      ))
  };

  const renderDesktop = () => (
    <Table style={{ width: "100%", }} striped stackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Price</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Quantity</Table.HeaderCell>
          <Table.HeaderCell textAlign="center">Total</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        { displayCartItems() }
      </Table.Body>
    </Table>
  );

  const renderMobile = () => {
      return cart.map( c => (
        <MobileContainer key={c.id}>
          <div style={{ display: "flex", justifyContent: "center", }}>
            <ItemImage src={c.url} />
          </div>
          <br />
          <br />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
            <CartItem>
              <p>Product:</p>
              <p>{ c.title }</p>
            </CartItem>
            <CartItem>
              <p>Price:</p>
              <p>${ formatPrice(c.price) }</p>
            </CartItem>
            <CartItem>
              <p>Quantity:</p>
              <p>1</p>
            </CartItem>
            <CartItem>
              <p>SubTotal:</p>
              <p>${ formatPrice(c.price) }</p>
            </CartItem>
            <br />
            <ClearImg src={clear} onClick={() => removeFromCart(c)} />
          </div>
        </MobileContainer>
      ))
  };

  return (
    <StyledContainer>
      <Header primary>Cart</Header>
      { windowWidth >= 770 ? renderDesktop() : renderMobile() }
      <CheckoutContainer>
        <div style={{ display: "flex", alignItems: "center", }}>
          <Header style={{ margin: "0 25px 10px 0", }}>Subtotal</Header>
          <Header style={{ margin: "0 0 10px 0", }}>${getTotal()}</Header>
        </div>
        <Button
          onClick={handleClick}
          style={{ width: "200px", }}
        >
          Checkout
        </Button>
      </CheckoutContainer>
    </StyledContainer>
  );
};

// ---------------   MOBILE   ------------------------


const MobileContainer = styled.div`
  border: 1px solid #bfbfbf;
  padding: 20px 10px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;


// ---------------------------------------------------

const Item = styled(Table.Cell)`
  display: flex;
  align-items: center;
  height: 100px;
`;

const ItemDescription = styled.div`
  display: flex;
  align-items: center;
`;

const ItemImage = styled.div`
  background: url(${ props => props.src });
  background-repeat: none;
  background-position: center;
  background-size: cover;
  height: 85px;
  width: 85px;
`;

const ClearImg = styled.img`
  src: ${ props => props.src };
  height: 20px;
  width: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    transition: opacity 0.3s ease;
    opacity: 0.8;
  }
`;

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 25px;
`;

export default Cart;
