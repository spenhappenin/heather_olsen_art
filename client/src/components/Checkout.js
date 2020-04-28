import React from "react";
import { loadStripe, } from "@stripe/stripe-js";
import { Elements, } from "@stripe/react-stripe-js"
import CheckoutForm from "./CheckoutForm";
import { StyledContainer, Header, } from "../styles/shared";

const stripePromise = loadStripe("pk_test_9zZeIruUDED1UP3vbPWL1AGC00Mgf9LvPc");

const Checkout = ({ history: { push, } }) => {
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
