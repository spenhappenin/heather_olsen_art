import React, { useContext, useEffect, } from "react";
import axios from "axios";
import { loadStripe, } from "@stripe/stripe-js";
import { Elements, } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { CartContext, } from "../providers/CartProvider";
import { FlashContext, } from "../providers/FlashProvider";
import { StyledContainer, Header, } from "../styles/shared";

const stripePromise = loadStripe("pk_test_9zZeIruUDED1UP3vbPWL1AGC00Mgf9LvPc");

const Checkout = ({ history: { push, goBack, } }) => {
  const { cart, removeManyFromCart, } = useContext(CartContext);
  const { setFlash, } = useContext(FlashContext);

  useEffect(() => {
    axios.get("/api/check-availability", { params: { cart, } })
      .catch( err => {
        const { message, unavailable, } = err.response.data;
        setFlash(message, "red");
        if (unavailable) { removeManyFromCart(unavailable); }
        goBack();
      })
  }, []);

  return (
    <StyledContainer>
      <Header primary>Checkout</Header>
      <br />
      <Elements stripe={stripePromise}>
        <CheckoutForm push={push} />
      </Elements>
    </StyledContainer>
  );
};

export default Checkout;
