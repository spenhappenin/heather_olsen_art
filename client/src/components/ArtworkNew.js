import React, { useState, useEffect, } from "react";
import axios from "axios";
import Loader from "./Loader";
import styled from "styled-components";
import { useForm, } from "./hooks/useForm";
import { Form, } from "semantic-ui-react";
import { StyledDropzone, } from "../styles/artWork";
import { Button, Header, StyledContainer, } from "../styles/shared";

const ArtworkNew = ({ history, }) => {
  const [fileData, setFileData] = useState("");
  const [title, setTitle] = useState("");
  const [surface, setSurface] = useState("");
  const [medium, setMedium] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [dateComplete, setDateComplete] = useState("");
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [artworkCategories, setArtworkCategories] = useState([]);
  const [fileUploading, setFileUploading] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect( () => {
    axios.get("/api/works")
      .then( res => {
        setCategories(res.data);
      })
      .catch( err => {
        // AUTH: Add Flash
        console.log(err.response);
      })
  }, []);

  const handleCheckbox = (e, data) => {
    if (data.checked) {
      if (!artworkCategories.includes(data.id))
        setArtworkCategories([...artworkCategories, data.id]);
    } else {
      const filtered = artworkCategories.filter(c => c !== data.id);
      setArtworkCategories(filtered);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);
    let data = new FormData();
    let photo = fileData;
    data.append(photo.name, photo);
    data.append("title", title);
    data.append("medium", medium);
    data.append("surface", surface);
    data.append("dimensions", dimensions);
    data.append("price", price);
    data.append("date_complete", dateComplete);
    data.append("status", status);
    data.append("artwork_categories", JSON.stringify(artworkCategories));

    axios.post("/api/artworks", data)
      .then( res => {
        // AUTH: Add Flash
        setLoader(false);
        history.goBack();
      })
      .catch( err => {
        // AUTH: Add Flash
        console.log(err.response);
      })
  };

  const categoryCheckboxes = () => {
    return categories.map( c => (
      <CheckboxInput
        key={c.id}
        id={c.id}
        name={c.title}
        label={c.title}
        checked={artworkCategories.includes(c.id)}
        onChange={handleCheckbox}
      />
    ));
  };

  const onDrop = (photos) => {
    toggleUploading();
    setFileData(photos[0]);
  };

  const toggleUploading = () => setFileUploading(!fileUploading);

  const handleDropdown = (e) => setStatus(e.target.innerText.toLowerCase());

  return (
    <StyledContainer>
      { loader && <Loader /> }
      <Header primary>New Art Work</Header>
      <Form onSubmit={handleSubmit}>
        <StyledDropzone onDrop={onDrop}>
          {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
            if (isDragActive) {
              return "This file is authorized";
            }
            if (isDragReject) {
              return "This file is not authorized";
            }
            return acceptedFiles.length || rejectedFiles.length ?
              <h4 textAlign="center">{`Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`}</h4>
              :
              <h4 textAlign="center">Drag photo here or click to select a file.</h4>;
          }}
        </StyledDropzone>
        <br />
        <Form.Group widths="equal">
          <Input
            required
            name="title"
            label="Title"
            placeholder="Some Art Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>
        <Label>Categories</Label>
        <CheckboxContainer>
          { categoryCheckboxes() }
        </CheckboxContainer>
        <Form.Group widths="equal">
          <Input
            required
            name="surface"
            label="Surface"
            placeholder="Canvas..."
            value={surface}
            onChange={e => setSurface(e.target.value)}
          />
          <Input
            name="medium"
            label="Medium"
            placeholder="Oil"
            value={medium}
            onChange={e => setMedium(e.target.value)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Input
            required
            name="dimensions"
            label="Dimensions"
            placeholder="10 x 10"
            value={dimensions}
            onChange={e => setDimensions(e.target.value)}
          />
          <Input
            name="price"
            type="number"
            label="Price"
            placeholder="$450.00"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <SelectInput
            required
            name="status"
            label="Status"
            placeholder="For Sale"
            options={statusOptions}
            value={status}
            onChange={handleDropdown}
            // onChange={e => setStatus(e.target.value)}
          />
          <Input
            required
            type="date"
            name="dateComplete"
            label="Date Complete"
            placeholder="Some date..."
            value={dateComplete}
            onChange={e => setDateComplete(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button type="submit">Submit</Button>
      </Form>
    </StyledContainer>
  );
};

const statusOptions = [
  { key: "for sale", text: "For Sale", value: "for sale" },
  { key: "nfs", text: "NFS", value: "nfs" },
  { key: "sold", text: "Sold", value: "sold" }
];

const Input = styled(Form.Input)`
  font-family: "Julius Sans One", sans-serif;
  font-weight: bolder;
  font-size: 16px;
`;

const SelectInput = styled(Form.Select)`
  font-family: "Julius Sans One", sans-serif;
  font-weight: bolder;
  font-size: 16px;
`;

const Label = styled.p`
  font-family: "Julius Sans One", sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 4px !important;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const CheckboxInput = styled(Form.Checkbox)`
  font-family: "Julius Sans One", sans-serif;
  margin-right: 15px !important;
`;

export default ArtworkNew;
