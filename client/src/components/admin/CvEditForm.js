import React, { useContext, useEffect, useState, } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FlashContext, } from "../../providers/FlashProvider";

const CvEditForm = (props) => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");

  const { setFlash, } = useContext(FlashContext);

  useEffect( () => {
    const { date, location, title, } = props;
    setDate(date);
    setLocation(location);
    setTitle(title);
  }, []);

  const handleSubmit = () => {
    const { id, } = props;
    axios.put(`/api/admin/cvs/cvs/${id}`, { cv: { title, cv_date: date, location, }, })
      .then( res => {
        setFlash(`${ res.data } Created`, "green");
        props.update(res.data);
        props.toggleEdit();
      })
      .catch( err => {
        setFlash(err.response, "red");
      })
  };

  const renderButtons = () => (
    <span>
      <CvButton onClick={handleSubmit} type='button'>Accept</CvButton>
      <CvButton onClick={props.toggleEdit} type='button'>Cancel</CvButton>
    </span>
  );

  switch (props.type) {
    case "one":
      return (
        <Form onSubmit={handleSubmit}>
          <Input
            name="title"
            value={title}
            onChange={ e => setTitle(e.target.value) }
          />
          { renderButtons() }
        </Form>
      )
    case "two":
      return (
        <Form onSubmit={handleSubmit}>
          <Input
            name="title"
            onChange={ e => setTitle(e.target.value) }
            value={title}
          />
          <Input
            name="date"
            onChange={ e => setDate(e.target.value) }
            type="date"
            value={date}
          />
          { renderButtons() }
        </Form>
      )
    case "three":
      return (
        <Form onSubmit={handleSubmit}>
          <Input
            name="date"
            onChange={e => setDate(e.target.value)}
            required
            smaller
            type="date"
            value={date}
          />
          <Input
            name="title"
            onChange={ e => setTitle(e.target.value) }
            required
            value={title}
          />
          <Input
            name="location"
            onChange={ e => setLocation(e.target.value) }
            required
            value={location}
          />
          { renderButtons() }
        </Form>
      )
    default:
      return null;
  };
};

const CvButton = styled.button`
  background-color: #272727;
  border-color: #272727;
  color: #fff;
  cursor: pointer;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-left: 10px;
  padding: 10px 15px 10px 15px;
  text-transform: uppercase;
  transition: background-color 0.3s ease;

  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: #595959;
    transition: background-color 0.3s ease;
  }
`;

const Form = styled.form`
  display: flex;
`;

const Input = styled.input`
  border: 1px solid rgba(34,36,38,.15);
  box-shadow: 0 0 0 0 transparent inset;
  color: rgba(0,0,0,.87);
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  font-size: 14px !important;
  height: 35px;
  line-height: 1.21428571em;
  margin: 0 0 5px 0;
  outline: 0;
  padding: .67857143em 1em;
  transition: color .1s ease,border-color .1s ease;
  width: ${ props => props.smaller ? '161px' : '225px' };
`;

export default CvEditForm;
