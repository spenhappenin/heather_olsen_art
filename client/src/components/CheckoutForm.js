import React, { Fragment, useState, useContext, } from "react";
import axios from "axios";
import styled from "styled-components";
import Loader from "./Loader";
import { CartContext, } from "../providers/CartProvider";
import { Form, } from "semantic-ui-react";
import { Button, } from "../styles/shared";
import { Dropdown, } from "./shared/Form";
import { countryOptions, stateOptions, } from "../helpers/shipping";
import { FaCcVisa, FaCcMastercard, FaCcDiscover, FaCcJcb, FaCcAmex, FaInfoCircle, } from 'react-icons/fa';


import { CardElement, useStripe, useElements, } from "@stripe/react-stripe-js";

const CheckoutForm = (props) => {
  // Stripe Stuff
  const stripe = useStripe();
  const elements = useElements();

  const [loader, setLoader] = useState(false);

  // Cart/Billing Stuff
  const { cart, total, } = useContext(CartContext);
  const [email, setEmail] = useState("hughpeppercorn@gmail.com");
  const [firstName, setFirstName] = useState("Hugh");
  const [lastName, setLastName] = useState("Peppercorn");
  const [line1, setLine1] = useState("1212 Cool Way");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("Sandy");
  const [country, setCountry] = useState("United States");
  const [custState, setCustState] = useState("UT");
  const [zip, setZip] = useState("84092");
  const [noBilling, setNoBilling] = useState(true);
  const [billing, setBilling] = useState(false);
  const [pickup, setPickup] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = total(pickup);
    setLoader(true);

    const { error, paymentMethod, } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // TODO: Loader while payment is processing
    axios.post("/api/charges", {
      pickup,
      cart,
      paymentMethod,
      user: {
        amount,
        email,
        first_name: firstName,
        last_name: lastName,
        billing_details: {
          line1,
          line2,
          city,
          country,
          custState,
          postal_code: zip,
        },
        shipping: {
          line1,
          line2,
          city,
          country,
          custState,
          postal_code: zip,
        }
      },
    })
      .then( res => {
        setLoader(false);
        // TODO: Clear cart from local storage
        // TODO: Redirect to a new page
        console.log(res.data);
      })
      .catch( err => {
        // TODO: Error handling
        setLoader(false);
        console.log(err.response);
      })

  };

  const handlePickupRadio = (e, { name, value, }) => {
    if (name === "pickup")
      setPickup(true);
    else
      setPickup(false);
  }

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
    <Fragment>
      { loader && <Loader /> }
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

        <br />

        <h3>Shipping Options</h3>
        <BillingContainer>
          <BillingOption top>
            <Form.Radio
              name="pickup"
              value={pickup}
              checked={pickup}
              onChange={handlePickupRadio}
            />
            <p>Pickup - Free</p>
            <FaInfoCircle style={{ marginLeft: "2rem", cursor: "pointer", }} />
          </BillingOption>

          <BillingOption>
            <Form.Radio
              name="shipping"
              value={pickup}
              checked={!pickup}
              onChange={handlePickupRadio}
            />
            <p>Shipping - Flat Rate - ${ cart.length >= 4 ? "29.99" : "14.99" }</p>
            <FaInfoCircle style={{ marginLeft: "2rem", cursor: "pointer", }} />
          </BillingOption>
        </BillingContainer>

        <br />
        <br />

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
          placeholder="Street"
          type="text"
          value={line1}
          name="line1"
          onChange={e => setLine1(e.target.value)}
        />
        <Form.Input
          placeholder="Apartment, suite, etc. (optional)"
          type="text"
          value={line2}
          name="line2"
          onChange={e => setLine2(e.target.value)}
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
          <TotalText>
            {
              pickup ?
                "Pickup - "
              :
                "Flat rate - "
            }
            ${ total(pickup).shippingTotal }
          </TotalText>
        </TotalContainer>
        <hr />
        <TotalContainer>
          <TotalHeader>Total:</TotalHeader>
          <TotalText total>${ total(pickup).grandTotal }</TotalText>
        </TotalContainer>
        <br />
        <br />
        <div style={{ display: "flex", }}>
          <h3>Payment Method</h3>
          <div style={{ marginLeft: "1rem", }}>
            <FaCcVisa style={{ width: "25px", height: "25px", marginleft: "10px", }} />
            <FaCcMastercard style={{ width: "25px", height: "25px", marginleft: "10px", }} />
            <FaCcDiscover style={{ width: "25px", height: "25px", marginleft: "10px", }} />
            <FaCcAmex style={{ width: "25px", height: "25px", marginleft: "10px", }} />
            <FaCcJcb style={{ width: "25px", height: "25px", marginleft: "10px", }} />
          </div>
        </div>
        <br />
        <br />

        {/* Test Card - 4242 4242 4242 4242 */}
        <CardElement /* {...createOptions()} */ />

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
        {/* TODO: Modal pop up with shipping info that they confirm */}
        {/* TODO: disabled doesnt work here */}
        <Button disabled={!stripe}>Submit Payment</Button>
      </Form>
    </Fragment>
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

export default CheckoutForm;
