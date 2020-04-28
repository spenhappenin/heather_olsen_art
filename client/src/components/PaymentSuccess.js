import React, { useEffect, } from "react";
import { Button, Header, Link, StyledContainer, } from "../styles/shared";

const PaymentSuccess = () => (
  <StyledContainer>
    <Header primary>Thank you for your purchase!</Header>
    <p>You will receive an email with more information</p>
    <br />
    <br />
    <br />
    <Link to="/butterflies">
      <Button>
        Continue Shopping
      </Button>
    </Link>
  </StyledContainer>
);

export default PaymentSuccess;
