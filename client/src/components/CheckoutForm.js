import React, { Fragment, useState, useContext, useEffect, } from "react";

import axios from "axios";
import styled from "styled-components";
// import Modal from "react-responsive-modal";
import { FaCcVisa, FaCcMastercard, FaCcDiscover, FaCcJcb, FaCcAmex, FaInfoCircle, } from 'react-icons/fa';

// import PaymentConfirm from "./PaymentConfirm";
import Loader from "./Loader";
import { CartContext, } from "../providers/CartProvider";
import { FlashContext, } from "../providers/FlashProvider";
import { Form, } from "semantic-ui-react";
import { Button, } from "../styles/shared";
// import { Dropdown, } from "./shared/Form";
import { formatPrice, } from "../helpers/cart";
import { countryOptions, stateOptions, } from "../helpers/shipping";

import { CardElement, useStripe, useElements, } from "@stripe/react-stripe-js";

const CheckoutForm = ({ push, }) => {
  // Stripe Stuff
  const stripe = useStripe();
  const elements = useElements();

  const [loader, setLoader] = useState(false);
  const { setFlash, } = useContext(FlashContext);
  // const [modalOpen, setModalOpen] = useState(false);

  // Cart/Billing Stuff
  const defaultValues = {
    firstName: "",
    lastName: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      country: "",
      state: "",
      postal_code: "",
    },
  };
  const [shippingInformation, setShippingInformation] = useState({
    firstName: "Hugh",
    lastName: "Peppercorn",
    address: {
      line1: "1234 Sacamano Way",
      line2: "",
      city: "Bluffdale",
      country: "United States",
      state: "UT",
      postal_code: "84065",
    },
  });
  const [billingInformation, setBillingInformation] = useState({
    firstName: "",
    lastName: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      country: "",
      state: "",
      postal_code: "",
    },
  });


  const { cart, clearCart, total, removeManyFromCart, } = useContext(CartContext);
  const [email, setEmail] = useState("hughpeppercorn@gmail.com");
  const [noBilling, setNoBilling] = useState(true);
  const [billing, setBilling] = useState(false);
  const [pickup, setPickup] = useState(true);

  // Update Billing Information anytime `billing` is updated
  useEffect( () => {
    checkBillingInformation()
  }, [billing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    };

    const cardElement = elements.getElement(CardElement);
    const amount = total(pickup);

    // Creates card
    const { error, paymentMethod, } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    // Checks if card is valid
    if (error)
      return setFlash(error.message, "red");

    setLoader(true);

    // Create a Stripe Source - Required to create the charge object
    stripe.createSource(cardElement, {
      type: "card",
      currency: "usd",
      amount: amount.grandTotal,
      owner: {
        email,
        name: `${billingInformation.firstName} ${billingInformation.lastName}`,
        address: { ...billingInformation.address, }
      }
    })
      .then( res => {
        // Once the source is created - api call to create stripe charge
        axios.post("/api/charges", {
          pickup,
          cart,
          paymentMethod,
          paymentSource: res.source,
          user: {
            amount,
            email,
            first_name: shippingInformation.firstName,
            last_name: shippingInformation.lastName,
            billing_details: { ...billingInformation, },
            shipping_details: { ...shippingInformation, },
          },
        })
          .then( res => {
            setLoader(false);
            window.localStorage.removeItem("items");
            clearCart();
            push("/payment-success");
          })
          .catch( err => {
            const { message, unavailable, } = err.response.data;
            setLoader(false);
            setFlash(message, "red");
            // TODO: Test this
            // If a piece is no loner available then remove that item from localStorage and cart.
            if (unavailable) { removeManyFromCart(unavailable); }
            push("/cart");
          })
      })
      .catch( err => {
        // TODO: Error handling here?
        debugger
        console.log(err);
      })
  };

  const checkBillingInformation = (value) => {
    if (billing) {
      setBillingInformation({ ...defaultValues, });
    } else {
      setBillingInformation({ ...shippingInformation, });
    }
  };

  const handlePickupRadio = (e, { name, value, }) => {
    if (name === "pickup")
      setPickup(true);
    else
      setPickup(false);
  }

  const handleRadio = (name, value) => {
    if (name === "billing") {
      setBilling(true);
      setNoBilling(false);
    } else {
      setBilling(false);
      setNoBilling(true);
    };
  };

  const renderBillingInformation = () => (
    <Fragment>
      <h3>Billing Address</h3>
      <Form.Group widths="equal">
        <Form.Input
          required
          placeholder="First Name"
          type="text"
          value={billingInformation.firstName}
          name="firstName"
          label="First Name"
          onChange={e => setBillingInformation({ ...billingInformation, firstName: e.target.value })}
        />
        <Form.Input
          required
          label="Last Name"
          placeholder="Last Name"
          type="text"
          value={billingInformation.lastName}
          name="lastName"
          onChange={e => setBillingInformation({ ...billingInformation, lastName: e.target.value })}
        />
      </Form.Group>
      <Form.Input
        required
        label="Address Line 1"
        placeholder="Street"
        type="text"
        value={billingInformation.address.line1}
        name="line1"
        onChange={e => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, line1: e.target.value }, })}
      />
      <Form.Input
        label="Address Line 2 (optional)"
        placeholder="Apartment, suite, etc. (optional)"
        type="text"
        value={billingInformation.address.line2}
        name="line2"
        onChange={e => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, line2: e.target.value }, })}
      />
      <Form.Input
        required
        label="City"
        placeholder="City"
        type="text"
        value={billingInformation.address.city}
        name="city"
        onChange={e => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, city: e.target.value }, })}
      />
      <Form.Group widths="equal">
        <Form.Select
          required
          label="Country"
          placeholder="Country"
          type="text"
          options={countryOptions}
          value={billingInformation.address.country}
          name="country"
          onChange={(e, t) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, country: t.value }, })}
        />
        <Form.Select
          required
          label="State"
          placeholder="State"
          type="text"
          options={stateOptions}
          value={billingInformation.address.state}
          name="custState"
          onChange={(e, t) => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, state: t.value }, })}
        />
        <Form.Input
          required
          label="ZIP Code"
          placeholder="ZIP code"
          type="number"
          value={billingInformation.address.postal_code}
          name="zip"
          onChange={e => setBillingInformation({ ...billingInformation, address: { ...billingInformation.address, postal_code: e.target.value }, })}
        />
      </Form.Group>
    </Fragment>
  )

  return (
    <Fragment>
      { loader && <Loader /> }
      <Form onSubmit={handleSubmit}>
        <h3>Contact Information</h3>
        <label>Email</label>
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
            value={shippingInformation.firstName}
            name="firstName"
            label="First Name"
            onChange={e => setShippingInformation({ ...shippingInformation, firstName: e.target.value })}
          />
          <Form.Input
            required
            label="Last Name"
            placeholder="Last Name"
            type="text"
            value={shippingInformation.lastName}
            name="lastName"
            onChange={e => setShippingInformation({ ...shippingInformation, lastName: e.target.value })}
          />
        </Form.Group>
        <Form.Input
          required
          label="Address Line 1"
          placeholder="Street"
          type="text"
          value={shippingInformation.address.line1}
          name="line1"
          onChange={e => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, line1: e.target.value }, })}
        />
        <Form.Input
          label="Address Line 2 (optional)"
          placeholder="Apartment, suite, etc. (optional)"
          type="text"
          value={shippingInformation.address.line2}
          name="line2"
          onChange={e => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, line2: e.target.value }, })}
        />
        <Form.Input
          required
          label="City"
          placeholder="City"
          type="text"
          value={shippingInformation.address.city}
          name="city"
          onChange={e => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, city: e.target.value }, })}
        />
        <Form.Group widths="equal">
          <Form.Select
            required
            label="Country"
            placeholder="Country"
            type="text"
            options={countryOptions}
            value={shippingInformation.address.country}
            name="country"
            onChange={(e, t) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, country: t.value }, })}
          />
          <Form.Select
            required
            label="State"
            placeholder="State"
            type="text"
            options={stateOptions}
            value={shippingInformation.address.state}
            name="custState"
            onChange={(e, t) => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, state: t.value }, })}
          />
          <Form.Input
            required
            label="ZIP Code"
            placeholder="ZIP code"
            type="number"
            value={shippingInformation.address.postal_code}
            name="zip"
            onChange={e => setShippingInformation({ ...shippingInformation, address: { ...shippingInformation.address, postal_code: e.target.value }, })}
          />
        </Form.Group>

        <br />
        <br />

        <h3>Cart Totals</h3>
        <TotalContainer>
          <TotalHeader>Subtotal:</TotalHeader>
          <TotalText>${ formatPrice(total().subTotal) }</TotalText>
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
            ${ formatPrice(total(pickup).shippingTotal) }
          </TotalText>
        </TotalContainer>
        <hr />
        <TotalContainer>
          <TotalHeader>Total:</TotalHeader>
          <TotalText total>${ formatPrice(total(pickup).grandTotal) }</TotalText>
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
        <fieldset className="FormGroup">
          <div className="FormRow">
            <CardElement options={CARD_OPTIONS} />
          </div>
        </fieldset>

        <br />
        <h3>Billing Information</h3>
        <BillingContainer>
          <BillingOption>
            <Form.Radio
              name="noBilling"
              value={noBilling}
              checked={noBilling}
              onChange={(e, {name, value}) => { handleRadio(name, value); checkBillingInformation(value); }}
            />
            <p>Same as shipping address</p>
          </BillingOption>
          <BillingOption top>
            <Form.Radio
              name="billing"
              value={billing}
              checked={billing}
              onChange={(e, {name, value}) => { handleRadio(name, value); checkBillingInformation(value); }}
            />
            <p>Use a different billing address</p>
          </BillingOption>
        </BillingContainer>
        <br />

        { billing && renderBillingInformation() }

        <br />
        <br />
      <Button disabled={!stripe} /*onClick={() => setModalOpen(true)} */>
        Submit Payment
      </Button>
    </Form>

      {/* <PaymentConfirm
        handleSubmit={handleSubmit}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        data={{ email, shippingInformation, billingInformation, }}
      /> */}

    </Fragment>
  );
};

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      // iconColor: '#c4f0ff',
      // color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {color: '#fce883'},
      // '::placeholder': {color: '#87bbfd'},
    },
    invalid: {
      // iconColor: '#ffc7ee',
      // color: '#ffc7ee',
    },
  },
};

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
