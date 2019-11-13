import React, { useState, useContext, } from "react";
import axios from "axios";
import styled from "styled-components";
import { CartContext, } from "../providers/CartProvider";
import { Form, } from "semantic-ui-react";
import { Button, } from "../styles/shared";
import { CardElement, injectStripe, ReactStripeElements, } from "react-stripe-elements";

const CheckoutForm = (props) => {
  const { cart, total, } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [custState, setCustState] = useState("");
  const [zip, setZip] = useState("");
  const [noBilling, setNoBilling] = useState(true);
  const [billing, setBilling] = useState(false);
  
  const handleSubmit = async (e) => {
    const amount = total;
    e.preventDefault();
    try {
      const { token, } = await props.stripe.createToken({ firstName, });

      axios.post("/api/process-payment", { token, amount, email, })
        .then(res => {
          // Redirect to a new page
          console.log(res.data);
        })
        .catch( err => {
          debugger
        })
    } catch (e) {
      throw e;
    }
  };

  const handleRadio = (e, { name, value, }) => {
    if (name === "billing") {
      setBilling(true);
      setNoBilling(false);
    } else {
      setBilling(false);
      setNoBilling(true);
    };
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Customer Information</h3>
      <Form.Input
        placeholder="Email"
        type="email"
        value={email}
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <h3>Shipping address</h3>
      <Form.Group widths="equal">
        <Form.Input
          placeholder="First Name"
          type="text"
          value={firstName}
          name="firstName"
          onChange={e => setFirstName(e.target.value)}
        />
        <Form.Input
          placeholder="Last Name"
          type="text"
          value={lastName}
          name="lastName"
          onChange={e => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Input
        placeholder="Address"
        type="text"
        value={street}
        name="street"
        onChange={e => setStreet(e.target.value)}
      />
      <Form.Input
        placeholder="Apartment, suite, etc. (optional)"
        type="text"
        value={apartment}
        name="apartment"
        onChange={e => setApartment(e.target.value)}
      />
      <Form.Input
        placeholder="City"
        type="text"
        value={city}
        name="city"
        onChange={e => setCity(e.target.value)}
      />
      <Form.Group widths="equal">
        <Form.Input
          placeholder="Country"
          type="text"
          value={country}
          name="country"
          onChange={e => setCountry(e.target.value)}
        />
        <Form.Input
          placeholder="State"
          type="text"
          value={custState}
          name="custState"
          onChange={e => setCustState(e.target.value)}
        />
        <Form.Input
          placeholder="ZIP code"
          type="text"
          value={zip}
          name="zip"
          onChange={e => setZip(e.target.value)}
        />
      </Form.Group>
      <h3>Payment Method</h3>
      <h4>${total}</h4>
      <br />
      <br />
      <CardElement {...createOptions()} />
      <br />
      <br />
      <br />
      <h3>Billing Information</h3>
      <BillingContainer>
        <BillingOption>
          <Form.Radio
            name="noBilling"
            value={noBilling}
            checked={noBilling}
            onChange={handleRadio}
          />
          <p>Same as shipping address</p>
        </BillingOption>
        <BillingOption top>
          <Form.Radio
            name="billing"
            value={billing}
            checked={billing}
            onChange={handleRadio}
          />
          <p>Use a different billing address</p>
        </BillingOption>
      </BillingContainer>
      <br />
      <br />
      <Button>Submit Payment</Button>
    </Form>
  );
};

const createOptions = () => (
  {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        fontFamily: "Open Sans, sans-serif",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "50px",
      },
      invalid: {
        color: "#c23d4b",
      },
    }
  }
);

const BillingContainer = styled.div`
  border: 1px solid #e2e2e2;
  border-radius: 4px;
`;

const BillingOption = styled.div`
  display: flex;  
  align-items: center;
  padding: 20px;
  border-top: ${ props => props.top ? "1px solid #e2e2e2" : 0};
`;

export default injectStripe(CheckoutForm);
