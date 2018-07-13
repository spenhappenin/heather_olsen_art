import React from 'react';
import axios from 'axios';
import { Form, } from 'semantic-ui-react';
import { StyledDropzone, } from '../styles/artWork';
import { Button, Header, StyledContainer, } from '../styles/shared';

class ArtworkNew extends React.Component {
  state = { 
    fileData: '',
    title: '', 
    surface: '', 
    medium: '', 
    dimensions: '', 
    price: '', 
    status: '', 
    dateComplete: '', 
    open: false,
    categories: [], 
    artworkCategories: [],
    fileUploading: false, 
  };

  componentDidMount() {
    axios.get('/api/works')
      .then( res => {
        this.setState({ categories: res.data, });
      })
      .catch( err => {
        // TODO: Error handling
        console.log('Error...')
      })
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  
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
    e.preventDefault();

    let data = new FormData();
    let photo = this.state.fileData;

    data.append(photo.name, photo);
    data.append('title', this.state.title);
    data.append('medium', this.state.medium);
    data.append('surface', this.state.surface);
    data.append('dimensions', this.state.dimensions);
    data.append('price', this.state.price);
    data.append('date_complete', this.state.dateComplete);
    data.append('status', this.state.status);
    data.append('artwork_categories', JSON.stringify(this.state.artworkCategories));
    // debugger
    axios.post('/api/art_works', data)
      .then( res => {
        debugger
      })
      .catch( err => {
        // TODO: Error handling
        debugger
      })
  };

  categoryCheckboxes = () => {
    return this.state.categories.map( c => (
      <Form.Checkbox 
        key={c.id} 
        id={c.id}
        name={c.title} 
        label={c.title}
        checked={this.state.artworkCategories.includes(c.id)} 
        onChange={this.handleCheckbox.bind(this)} 
      />
    ));
  };

  onDrop = (photos) => {
    this.toggleUploading();
    this.setState({ fileData: photos[0], });
  };

  toggleUploading = () => this.setState({ fileUploading: !this.state.fileUploading, });

  render() {
    return(
      <StyledContainer>
        <Header title>New Art Work</Header>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <StyledDropzone onDrop={this.onDrop}>
            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
              if (isDragActive) {
                return "This file is authorized";
              }
              if (isDragReject) {
                return "This file is not authorized";
              }
              return acceptedFiles.length || rejectedFiles.length ? 
                <h4 textAlign='center'>{`Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`}</h4>
              : 
                <h4 textAlign='center'>Drag photo here or click to select a file.</h4>;
            }}
          </StyledDropzone>
          <br />
          <Form.Group widths='equal'>
            <Form.Input
              required
              name='title'
              label='Title'
              placeholder='Some Art Title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            { this.categoryCheckboxes() }
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              required
              name='surface'
              label='Surface'
              placeholder='Canvas...'
              value={this.state.surface}
              onChange={this.handleChange}
            />
            <Form.Input
              name='medium'
              label='Medium'
              placeholder='Oil'
              value={this.state.medium}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              required
              name='dimensions'
              label='Dimensions'
              placeholder='10 x 10'
              value={this.state.dimensions}
              onChange={this.handleChange}
            />
            <Form.Input
              name='price'
              type='number'
              label='Price'
              placeholder='$450.00'
              value={this.state.price}
              onChange={this.handleChange}
            />
          </Form.Group>
           <Form.Group widths='equal'>
            <Form.Select
              required
              name='status'
              label='Status'
              placeholder='For Sale'
              options={statusOptions}
              value={this.state.status}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              type='date'
              name='dateComplete'
              label='Date Complete'
              placeholder='Some date...'
              value={this.state.dateComplete}
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

const statusOptions = [
  { key: 'for sale', text: 'For Sale', value: 'for sale' },
  { key: 'nfs', text: 'NFS', value: 'nfs' },
  { key: 'sold', text: 'Sold', value: 'sold' }
];

export default ArtworkNew;
