import React, { useContext, useEffect, useState, } from "react";
import axios from "axios";
import DeleteArtworkModal from "./admin/DeleteArtworkModal";
import styled from "styled-components";
import { FlashConsumer, } from "../providers/FlashProvider";
import { Button, Header, StyledContainer, } from "../styles/shared";
import { Form, Icon, Image, } from "semantic-ui-react";

class ArtworkEdit extends React.Component {
  state = { 
    title: "", 
    surface: "", 
    medium: "", 
    dimensions: "", 
    price: "", 
    status: "", 
    dateComplete: "", 
    url: "",
    open: false,
    categories: [], 
    artworkCategories: [],
  };

  componentDidMount() {
    axios.get(`/api/artworks/artworks/${this.props.match.params.id}`)
      .then( res => {
        const { data, } = res;
        this.setState({ 
          artWork: data.artwork,
          title: data.artwork.title, 
          url: data.artwork.url, 
          medium: data.artwork.medium,
          surface: data.artwork.surface, 
          dimensions: data.artwork.dimensions, 
          price: data.artwork.price, 
          dateComplete: data.artwork.date_complete, 
          status: data.artwork.status,
          categories: data.categories,
          artworkCategories: data.artworkCategories,
        });
      })
      .catch( err => {
        this.props.setFlash(err.response, "red");
      })
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value, });
  
  handleCheckbox = (e, data) => {
    if(data.checked) {
      if(!this.state.artworkCategories.includes(data.id)) {
        this.setState({ artworkCategories: [...this.state.artworkCategories, data.id], });
      }
    } else {
      let filtered = this.state.artworkCategories.filter( c => c !== data.id);
      this.setState({ artworkCategories: filtered, });
    };
  };
  
  handleSubmit = (e) => {
    const { match: { params: { id, }, }, } = this.props;

    e.preventDefault();
    axios.put(`/api/admin/artworks/artworks/${id}`, { ...this.state, })
      .then( () => {      
        this.props.setFlash("Artwork Updated", "green");  
        this.props.history.goBack();
      })
      .catch( err => {
        this.props.setFlash(err.response, "red");        
      })
  };

  show = () => () => this.setState({ open: true, });

  close = () => this.setState({ open: false, });

  categoryCheckboxes = () => {
    return this.state.categories.map( c => (
      <CheckboxInput 
        key={c.id} 
        id={c.id}
        name={c.title} 
        label={c.title}
        checked={this.state.artworkCategories.includes(c.id)} 
        onChange={this.handleCheckbox.bind(this)} 
      />
    ))
  }

  render() {
    return(
      <StyledContainer>
        <Header primary>{ this.state.title }</Header>
        <Button onClick={this.props.history.goBack}><Icon name='arrow left' />Back</Button>
        <Button onClick={this.show()}>Delete</Button>
        <DeleteArtworkModal artWorkTitle={this.state.title} artWorkId={this.props.match.params.id} open={this.state.open} onClose={this.close} type={this.props.type} goBack={this.props.history.goBack} />
        <br />
        <br />
        <Image alt={this.state.title} src={this.state.url} size='small'/>
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Input
              required
              name='title'
              label='Title'
              placeholder='Some Art Title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Label>Categories</Label>
          <CheckboxContainer>
            { this.categoryCheckboxes() }
          </CheckboxContainer>
          <Form.Group widths='equal'>
            <Input
              required
              name='surface'
              label='Surface'
              placeholder='Canvas...'
              value={this.state.surface}
              onChange={this.handleChange}
            />
            <Input
              name='medium'
              label='Medium'
              placeholder='Oil'
              value={this.state.medium}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Input
              required
              name='dimensions'
              label='Dimensions'
              placeholder='10 x 10'
              value={this.state.dimensions}
              onChange={this.handleChange}
            />
            <Input
              name='price'
              type='number'
              label='Price'
              placeholder='$450.00'
              value={this.state.price}
              onChange={this.handleChange}
            />
          </Form.Group>
           <Form.Group widths='equal'>
            <SelectInput
              required
              name='status'
              label='Status'
              placeholder='For Sale'
              options={statusOptions}
              value={this.state.status}
              onChange={this.handleChange}
            />
            <Input
              required
              type='date'
              name='dateComplete'
              label='Date Complete'
              placeholder='Some date...'
              value={this.state.dateComplete}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Input
              required
              type='url'
              name='url'
              label='Image URL'
              placeholder='https://image-url.com'
              value={this.state.url}
              onChange={this.handleChange}
            />
          </Form.Group>
          <br />
          <Button type='submit'>Submit</Button>
        </Form>
      </StyledContainer>
    );
  };
};

const ConnectedArtworkEdit = (props) => (
  <FlashConsumer>
    { value => 
      <ArtworkEdit {...props} setFlash={value.setFlash} />
    }
  </FlashConsumer>
);

const statusOptions = [
  { key: 'for sale', text: 'For Sale', value: 'for sale' },
  { key: 'nfs', text: 'NFS', value: 'nfs' },
  { key: 'sold', text: 'Sold', value: 'sold' }
];

const Input = styled(Form.Input)`
  font-family: 'Julius Sans One', sans-serif;
  font-weight: bolder;
  font-size: 16px;
`;

const SelectInput = styled(Form.Select)`
  font-family: 'Julius Sans One', sans-serif;
  font-weight: bolder;
  font-size: 16px;
`;

const Label = styled.p`
  font-family: 'Julius Sans One', sans-serif;
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
  font-family: 'Julius Sans One', sans-serif;
  margin-right: 15px !important;
`;

export default ConnectedArtworkEdit;
