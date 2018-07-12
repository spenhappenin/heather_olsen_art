import React from 'react';
import axios from 'axios';
import DeleteArtWorkModal from './admin/DeleteArtWorkModal';
import { setFlash, } from '../actions/flash';
import { Button, Header, StyledContainer, } from '../styles/shared';
import { Dropdown, Form, Icon, Image, } from 'semantic-ui-react';

class SingleArtWork extends React.Component {
  state = { 
    title: '', 
    surface: '', 
    medium: '', 
    dimensions: '', 
    price: '', 
    status: '', 
    dateComplete: '', 
    url: '', 
    open: false,
    categories: [], 
    artworkCategories: [],
  };

  componentDidMount() {
    axios.get(`/api/single_artwork/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ 
          artWork: res.data.artwork,
          title: res.data.artwork.title, 
          url: res.data.artwork.src, 
          medium: res.data.artwork.medium, 
          surface: res.data.artwork.surface, 
          dimensions: res.data.artwork.dimensions, 
          price: res.data.artwork.price, 
          dateComplete: res.data.artwork.date_complete, 
          status: res.data.artwork.status,
          url: res.data.artwork.url,
          categories: res.data.categories,
          artworkCategories: res.data.artworkCategories,
          // fileData: res.data.fileData, 
        });
      })
      .catch( err => {
        // TODO: error handle
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
    const { match: { params: { id, }, }, } = this.props;

    e.preventDefault();
    axios.put(`/api/art_works/${this.props.match.params.id}`, { ...this.state, })
      .then( res => {
        this.props.dispatch(setFlash('Artwork Updated!', 'green'));
      })
      .catch( err => {
        // TODO: Error handling
        console.log('Error...')
      })
  };

  show = () => () => this.setState({ open: true, });

  close = () => this.setState({ open: false, });

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
    ))
  }

  render() {
    return(
      <StyledContainer>
        <Header title>{ this.state.title }</Header>
        <Button onClick={this.props.history.goBack}><Icon name='arrow left' />Back</Button>
        <Button onClick={this.show()}>Delete</Button>
        <DeleteArtWorkModal artWorkTitle={this.state.title} artWorkId={this.props.match.params.id} open={this.state.open} onClose={this.close} type={this.props.type} goBack={this.props.history.goBack} />
        <br />
        <Image alt={this.state.title} src={this.state.url} size='small'/>
        <br />
        <Form onSubmit={this.handleSubmit}>
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
          <Form.Group widths='equal'>
            <Form.Input
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

const statusOptions = [
  { key: 'for sale', text: 'For Sale', value: 'for sale' },
  { key: 'nfs', text: 'NFS', value: 'nfs' },
  { key: 'sold', text: 'Sold', value: 'sold' }
];

export default SingleArtWork;
