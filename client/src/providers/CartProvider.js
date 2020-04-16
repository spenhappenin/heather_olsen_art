import React, { useState, useEffect, } from "react";
import axios from "axios";
import { formatPrice, } from "../helpers/cart";
export const CartContext = React.createContext();
export const CartConsumer = CartContext.Consumer;

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    let items = JSON.parse(localStorage.getItem("items"));
    axios.get(`/api/cart?items=${items}`)
      .then( res => {
        setCart(res.data);
      })
      .catch( err => {
        console.log(err);
      })
  };

  // Returns 1) subtotal | 2) grand total | 3) shipping total
  const total = () => {
    // TODO: Make more dynamic for any purchase
    let subTotal = 0;
    const shippingTotal = cart.length >= 4 && 3000 || cart.length <= 3 && 1500;
    cart.map( i => subTotal += i.price );
    const grandTotal = subTotal + shippingTotal;
    return { subTotal: formatPrice(subTotal), grandTotal: formatPrice(grandTotal), shippingTotal: formatPrice(shippingTotal), };
  };

  const addToCart = (item) => {  
    let items = cart.map( c => c.id );
    items = [...items, item.id];
    window.localStorage.setItem("items", JSON.stringify(items));
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    const cartItems = JSON.parse(localStorage.getItem("items")).filter( i => i !== item.id );    
    window.localStorage.setItem("items", JSON.stringify(cartItems));
    setCart(cart.filter( c => c.id !== item.id ));
  };

  return (
    <CartContext.Provider value={{
      cart,
      fetchCart,
      addToCart,
      removeFromCart,
      total,
    }}>
      { props.children }
    </CartContext.Provider>
  );
};
