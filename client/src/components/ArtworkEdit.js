import React from 'react';
import { connect, } from 'react-redux';
import axios from 'axios';
import DeleteArtWorkModal from './admin/DeleteArtWorkModal';
import { setFlash, } from '../actions/flash';
import { setHeaders, } from '../actions/headers';
import { Button, Header, StyledContainer, } from '../styles/shared';
import { Dropdown, Form, Icon, Image, } from 'semantic-ui-react';

class ArtworkEdit extends React.Component {
  state = { 
    title: '', 
    surface: '', 
    medium: '', 
    dimensions: '', 
    price: '', 
    status: '', 
    dateComplete: '', 
    url: '',
    url_thumbnail: '',
    url_mobile: '', 
    open: false,
    categories: [], 
    artworkCategories: [],
  };

  componentDidMount() {
    axios.get(`/api/single_artwork/${this.props.match.params.id}`)
      .then( res => {
        const { headers, data, } = res;

        this.props.dispatch(setHeaders(headers));
        this.setState({ 
          artWork: data.artwork,
          title: data.artwork.title, 
          url: data.artwork.src, 
          medium: data.artwork.medium,
          surface: data.artwork.surface, 
          dimensions: data.artwork.dimensions, 
          price: data.artwork.price, 
          dateComplete: data.artwork.date_complete, 
          status: data.artwork.status,
          url: data.artwork.url,
          url_thumbnail: data.artwork.url_thumbnail,
          url_mobile: data.artwork.url_mobile,
          categories: data.categories,
          artworkCategories: data.artworkCategories,
        });
      })
      .catch( err => {
        this.props.dispatch(setFlash(err.response, 'red'))
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
    axios.put(`/api/artworks/${this.props.match.params.id}`, { ...this.state, })
      .then( res => {
        this.props.dispatch(setFlash('Artwork Updated!', 'green'));
        this.props.history.goBack();
      })
      .catch( err => {
        this.props.dispatch(setFlash(err.response, 'red'))
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
        <Header primary>{ this.state.title }</Header>
        <Button onClick={this.props.history.goBack}><Icon name='arrow left' />Back</Button>
        <Button onClick={this.show()}>Delete</Button>
        <DeleteArtWorkModal artWorkTitle={this.state.title} artWorkId={this.props.match.params.id} open={this.state.open} onClose={this.close} type={this.props.type} goBack={this.props.history.goBack} />
        <br />
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
          <Form.Group widths='equal'>
            <Form.Input
              type='url'
              name='url_thumbnail'
              label='Image URL Thumbnail'
              placeholder='https://image-url.com'
              value={this.state.url_thumbnail}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              type='url'
              name='url_mobile'
              label='Image URL Mobile'
              placeholder='https://image-url.com'
              value={this.state.url_mobile}
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

export default connect()(ArtworkEdit);
