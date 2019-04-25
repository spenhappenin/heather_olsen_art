import React, { useState, useEffect, } from "react";

export const CartContext = React.createContext();
export const CartConsumer = CartContext.Consumer;

export const CartProvider = (props) => {
  const [cart, setCart] = useState([]);  

  useEffect( () => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    let items = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      items.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    setCart(items);
  };

  const addToCart = (item) => {
    window.localStorage.setItem(item.title, JSON.stringify(item));
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    window.localStorage.removeItem(item.title);
    const newCart = cart.filter( i => {
      if (i.id !== item.id)
        return i;
    })
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{
      cart,
      fetchCart,
      addToCart,
      removeFromCart,
    }}>
      { props.children }
    </CartContext.Provider>
  )
}
