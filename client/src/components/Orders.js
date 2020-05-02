import React, { useEffect, useState, } from "react";

import { Link, } from "react-router-dom";
import { Icon, Label, Menu, Table } from 'semantic-ui-react';

import { Header, StyledContainer, } from "../styles/shared";

import axios from "axios"

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect( () => {
    axios.get("/api/admin/orders/orders")
      .then( res => {
        setOrders(res.data);
      })
      .catch( err => {
        // TODO: Error Handling
      })
  }, []);

  return (
    <StyledContainer>
      <Header primary>Orders</Header>
      <br />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Invoice Number</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Sub Total</Table.HeaderCell>
            <Table.HeaderCell>Shipping Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            orders.map( o => (
              <Table.Row>
                  <Table.Cell>{o.id}</Table.Cell>
                  <Table.Cell><Link to={`/orders/${o.id}`}>{o.email}</Link></Table.Cell>
                  <Table.Cell>{o.first_name}</Table.Cell>
                  <Table.Cell>{o.last_name}</Table.Cell>
                  <Table.Cell>{o.sub_total}</Table.Cell>
                  <Table.Cell>{o.shipping_total}</Table.Cell>
                </Table.Row>
            ))
          }
        </Table.Body>

      </Table>
    </StyledContainer>
  );
};

export default Orders;
