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

  // TODO: Do this on the backend
  const formatCartPrices = () => {
    const formattedCart = cart.map( item => {
      return { ...item, price: formatPrice(item.price), };
    })
    return formattedCart;
  };

  // Returns 1) subtotal | 2) grand total | 3) shipping total
  const total = (pickup = true) => {
    // TODO: Make more dynamic for any purchase
    let subTotal = 0;
    const shippingTotal = pickup ? 0 : (cart.length >= 4 && 2999 || cart.length <= 3 && 1499);
    cart.map( i => subTotal += i.price );
    const grandTotal = subTotal + shippingTotal;
    return { subTotal, grandTotal, shippingTotal, };
  };

  const formattedTotal = (pickup = true) => {
    // TODO: Make more dynamic for any purchase
    let subTotal = 0;
    const shippingTotal = pickup ? 0 : (cart.length >= 4 && 2999 || cart.length <= 3 && 1499);
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

  const removeManyFromCart = (items) => {
    // TODO: Yikes, refactor this
    items.map( item => {
      let cartItems = JSON.parse(localStorage.getItem("items")).filter( i => i !== item.id );
      window.localStorage.setItem("items", JSON.stringify(cartItems));
    })

    let newCart = [];
    cart.map( cartItem => {
      JSON.parse(localStorage.getItem("items")).map( i => {
        if (cartItem.id === i)
          newCart.push(cartItem);
      })
    })
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{
      cart,
      fetchCart,
      addToCart,
      removeFromCart,
      removeManyFromCart,
      total,
      formattedTotal,
      formatCartPrices,
      clearCart: () => setCart([]),
    }}>
      { props.children }
    </CartContext.Provider>
  );
};
