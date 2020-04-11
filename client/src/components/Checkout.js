import React from "react";
import CheckoutForm from "./CheckoutForm";
import { StripeProvider, Elements, } from 'react-stripe-elements';
import { StyledContainer, Header, } from "../styles/shared";

const Checkout = (props) => {
  return (
    <StripeProvider apiKey="pk_test_9zZeIruUDED1UP3vbPWL1AGC00Mgf9LvPc">
      <StyledContainer>
        <Header primary>Checkout</Header>
        <br />
        <Elements>
          <CheckoutForm />
        </Elements>
      </StyledContainer>
    </StripeProvider>
  )
}
export default Checkout;
