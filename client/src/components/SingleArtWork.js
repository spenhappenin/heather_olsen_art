import React from 'react';
import axios from 'axios';
import DeleteArtWorkModal from './admin/DeleteArtWorkModal';
import { Button, Header, StyledContainer, } from '../styles/shared';
import { Form, Icon, Image, } from 'semantic-ui-react';

class SingleArtWork extends React.Component {
  state = { title: '', surface: '', medium: '', dimensions: '', price: '', status: '', dateComplete: '', url: '', open: false, };

  componentDidMount() {
    axios.get(`/api/single_artwork/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ 
          artWork: res.data,
          title: res.data.title, 
          url: res.data.src, 
          medium: res.data.medium, 
          surface: res.data.surface, 
          dimensions: res.data.dimensions, 
          price: res.data.price, 
          dateComplete: res.data.date_complete, 
          status: res.data.status,
          url: res.data.url 
          // fileData: res.data.fileData, 
        });
      })
      .catch( err => {
        // TODO: error handle
        console.log('Error...')
      })
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  
  handleSubmit = (e) => {
    const { match: { params: { id, }, }, } = this.props;

    e.preventDefault();
    axios.put(`/api/art_works/${this.props.match.params.id}`, { ...this.state, })
      .then( res => {
        // debugger
      })
      .catch( err => {
        debugger
      })
  };

  show = () => () => this.setState({ open: true, });
  close = () => this.setState({ open: false, });

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
            {/* <Form.Select
              name='type'
              label='Type'
              placeholder='Painting...'
              options={typeOptions}
              value={type}
              onChange={this.handleChange}
            /> */}
            <Form.Input
              required
              name='title'
              label='Title'
              placeholder='Some Art Title'
              value={this.state.title}
              onChange={this.handleChange}
            />
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

export const statusOptions = [
  { key: 'for sale', text: 'For Sale', value: 'for sale' },
  { key: 'nfs', text: 'NFS', value: 'nfs' },
  { key: 'sold', text: 'Sold', value: 'sold' }
];

export default SingleArtWork;
