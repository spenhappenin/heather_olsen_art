import React from "react";
import Modal from "react-responsive-modal";

import { Header, StyledContainer, } from "../styles/shared";

import { Button, } from "../styles/shared";

const PaymentConfirm = ({ modalOpen, setModalOpen, handleSubmit, data: { email, firstName, lastName, line1, line2, country, custState, zip, city, } }) => (
  <Modal open={modalOpen} onClose={() => setModalOpen(false)} center>
    <StyledContainer>
      <p>Please confirm your information below:</p>
      <Header>Personal Information</Header>
      <p>{`${firstName} ${lastName}`}</p>
      <p>{ email }</p>
      <br />
      <Header>Shipping Information</Header>
      <p>{ line1 }</p>
      { line2 && <p>{ line2 }</p> }
      <p>{ `${ city }, ${ custState } ${ zip }` }</p>
      <Button
        onClick={() => { handleSubmit(); setModalOpen(false); }}
      >
        Confirm and Submit Payment
      </Button>
    </StyledContainer>
  </Modal>
);

export default PaymentConfirm;
