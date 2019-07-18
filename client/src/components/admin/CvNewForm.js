import React, { useContext, useState, } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment from "moment";
import { FlashContext, } from "../../providers/FlashProvider";
import { StyledContainer, } from "../../styles/shared";
import { Button, Header, } from "../../styles/shared";
import { Link, withRouter, } from "react-router-dom";
import { Form, Icon, Segment, } from "semantic-ui-react";

const  CvNewForm = (props) => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [cvDate, setCvDate] = useState(moment());
  const [title, setTitle] = useState("");
  const [cvType, setCvType] = useState("");

  const { setFlash, } = useContext(FlashContext);

  const handleDateChange = (date) => {
    setDate(date);
    setCvDate(date);
  };

  const handleDropdown = (e, { value, }) => setCvType(value);

  const handleSubmit = () => {
    axios.post("/api/cvs", { cv: { date, location, cv_date: cvDate, title, cv_type: cvType }, })
      .then( res => {
        setFlash(`${res.data.title} Added to CV`, "green");
        props.create(res.data);
        props.history.push("/admin-cv");
      })
      .catch( err => {
        setFlash(err.response, "red");
      })
  };

  return (
    <Segment as={StyledContainer} basic>
      <Header primary>New Cv Form</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Select
            name="cvType"
            label="Type"
            placeholder="Awards and Certificates"
            options={typeOptions}
            value={cvType}
            onChange={ handleDropdown }
          />
          <Form.Input
            required
            name="title"
            label="Title"
            placeholder="Some Art Title"
            value={title}
            onChange={ e => setTitle(e.target.value) }
          />
          <Form.Input
            name="location"
            label="Location"
            placeholder="Some Location"
            value={location}
            onChange={ e => setLocation(e.target.value) }
          />
        </Form.Group>
        <h5>Date</h5>
        <DatePicker
          selected={cvDate}
          onChange={handleDateChange}
        />
        <br />
        <Form.Group>
          <Link to="/admin-cv" rel="noopener noreferrer">
            <Button><Icon name="arrow left" />Back</Button>
          </Link>
          <Button type="submit">Submit</Button>
        </Form.Group>
      </Form>
    </Segment>
  );
};

const typeOptions = [
  { key: "award", text: "Awards and Certificates", value: "award" },
  { key: "current_rep", text: "Current Representation", value: "current_rep" },
  { key: "education", text: "Education", value: "education" },
  { key: "festival", text: "Festivals and Events", value: "festival" },
  { key: "exhibition", text: "Juried Exhibitions", value: "exhibition" },
];

export default withRouter(CvNewForm);
