import React, { useState, useContext, } from "react";
import axios from "axios";
import styled from "styled-components";
import { CartContext, } from "../providers/CartProvider";
import { Form, } from "semantic-ui-react";
import { Button, } from "../styles/shared";
import { Dropdown, } from "./shared/Form";
import { countryOptions, stateOptions, } from "../helpers/shipping";
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
    const amount = total();
    e.preventDefault();
    try {
      const { token, } = await props.stripe.createToken({ firstName, });

      axios.post("/api/charges", { 
        token, 
        user: { 
          amount, 
          email, 
          address: { 
            street, 
            apartment, 
            city, 
            country, 
            custState, 
            zip 
          } 
        }, 
      })
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
        required
        placeholder="Email"
        type="email"
        value={email}
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <h3>Shipping address</h3>
      <Form.Group widths="equal">
        <Form.Input
          required
          placeholder="First Name"
          type="text"
          value={firstName}
          name="firstName"
          onChange={e => setFirstName(e.target.value)}
        />
        <Form.Input
          required
          placeholder="Last Name"
          type="text"
          value={lastName}
          name="lastName"
          onChange={e => setLastName(e.target.value)}
        />
      </Form.Group>
      <Form.Input
        required
        placeholder="Address"
        type="text"
        value={street}
        name="street"
        onChange={e => setStreet(e.target.value)}
      />
      <Form.Input
        required
        placeholder="Apartment, suite, etc. (optional)"
        type="text"
        value={apartment}
        name="apartment"
        onChange={e => setApartment(e.target.value)}
      />
      <Form.Input
        required
        placeholder="City"
        type="text"
        value={city}
        name="city"
        onChange={e => setCity(e.target.value)}
      />
      <Form.Group widths="equal">
        <Form.Select
          required
          placeholder="Country"
          type="text"
          options={countryOptions}
          value={country}
          name="country"
          onChange={(e, t) => setCountry(t.value)}
        />
        <Form.Select
          required
          placeholder="State"
          type="text"
          options={stateOptions}
          value={custState}
          name="custState"
          onChange={(e, t) => setCustState(t.value)}
        />
        <Form.Input
          required
          placeholder="ZIP code"
          type="number"
          value={zip}
          name="zip"
          onChange={e => setZip(e.target.value)}
        />
      </Form.Group>      
      
      <br />
      <br />

      <h3>Cart Totals</h3>
      <TotalContainer>
        <TotalHeader>Subtotal:</TotalHeader>
        <TotalText>${ total().subTotal }</TotalText>
      </TotalContainer>     
      <TotalContainer>
        <TotalHeader>Shipping:</TotalHeader>
        <TotalText>Flat rate - ${ total().shippingTotal }</TotalText>
      </TotalContainer>  
      <hr />
      <TotalContainer>
        <TotalHeader>Total:</TotalHeader>
        <TotalText total>${ total().grandTotal }</TotalText>
      </TotalContainer>      
      <br />
      <br />      
      <h3>Payment Method</h3>
      <br />
      <br />
      <CardElement {...createOptions()} />
      <br />
      {/* <h3>Billing Information</h3>
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
      </BillingContainer> */}
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

const TotalContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const TotalHeader = styled.p`  
  margin: 0;
  margin-right: 3rem;
  font-weight: bold;
`;

const TotalText = styled.p`
  margin: 0;
  font-size: ${ props => props.total ? "1.5rem" : "14px" };
  font-weight: ${ props => props.total ? "bold" : "none" };
`;

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
