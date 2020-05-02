import React, { useEffect, useState, } from "react";

import axios from "axios";

import { Header, StyledContainer, } from "../styles/shared";

const Order = ({ match: { params: { id, } } }) => {
  const [order, setOrder] = useState({});
  const [artworks, setArtworks] = useState([]);

  useEffect( () => {
    axios.get(`/api/admin/orders/orders/${id}`)
      .then( res => {
          setArtworks(res.data.artworks);
          setOrder(res.data.order);
        })
        .catch( err => {
          debugger
        })
  }, []);

  return (
    <StyledContainer>
      <Header primary>Order - {order.email}</Header>
      <img
        style={{ width: "200px" }}
        src="https://res.cloudinary.com/dtb6lx1s4/image/upload/v1588284459/heather_olsen_logo_kqypt6.png"
      />

      <br />
      <br />

      <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", }}>
        <p>Your Receipt</p>
        <p>Invoice Number: #{order.id}</p>
      </div>

      <br />
      <br />

      <Header>Your Purchases</Header>
      <div>
        {
          artworks.map( a => (
            <div style={{ display: "flex", alignItems: "center", }}>
              <img
                src={a.url}
                style={{ width: "100px", }}
              />
              <Header style={{ marginLeft: "10px" }}>{a.title}</Header>
            </div>
          ))
        }

        <br />
        <br />

        <div>
          <p>Sub Total: ${ (order.sub_total / 100).toFixed(2) }</p>
          <p>Shipping Total: ${ (order.shipping_total / 100).toFixed(2) }</p>
          <p>Grand Total: ${ ((order.sub_total + order.shipping_total) / 100).toFixed(2)}</p>
        </div>
      </div>

      <br />
      <br />

      <div>
        <Header>Thank you for your purchase!</Header>
        {
          order.shipping_total === 0 ?
            <p>Your art piece will be available to take home this week. Pickup will be at the following address: 3334 W 12130 S, Riverton, UT 84065.
            Please contact me by email, phone call or text message to set up a pickup time. Email: heatherolsenart@gmail.com - Phone: (801) 300-5262</p>
          :
            <p>Your beautiful butterfly art piece is on it's way! Please allow 4-5 business days for your painting to be shipped to you. (or longer if needed)
            If you have any questions please reach out to heatherolsenart.com</p>
        }
      </div>

      <br />
      <br />
      <br />

    </StyledContainer>
  );
};

export default Order;
