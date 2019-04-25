import React, { useContext, } from "react";
import styled from "styled-components";
import { formatPrice, } from "../helpers/cart";
import { Table, } from "semantic-ui-react";
import { StyledContainer, Header, Button, } from "../styles/shared";
import { CartContext, } from "../providers/CartProvider";
import clear from "../images/clear.svg";

const Cart = (props) => {
  const { cart, removeFromCart, } = useContext(CartContext);

  const getTotal = () => {
    let total = 0;
    cart.map( i => total += i.price);
    return formatPrice(total);
  }; 

  const displayCartItems = () => {
    if (cart.length === 0)
      return <div><Header>No Items In Cart</Header></div>
    else
      return cart.map( c => (
        <Table.Row style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}>
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
  }

  return (
    <StyledContainer>
      <Header primary>Cart</Header>
      <Table style={{ width: "100%" }} striped>
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
      <CheckoutContainer>
        <div style={{ display: "flex", alignItems: "center", }}>
          <Header style={{ margin: "0 25px 10px 0", }}>Subtotal</Header>
          <Header style={{ margin: "0 0 10px 0", }}>${getTotal()}</Header>
        </div>
        <Button style={{ width: "200px", }}>Checkout</Button>
      </CheckoutContainer>
    </StyledContainer>
  )
}

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
