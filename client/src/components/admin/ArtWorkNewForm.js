import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { StyledContainer } from '../../styles/shared';
import { createComission } from '../../actions/comissions';
import { createDrawing } from '../../actions/drawings';
import { createPainting } from '../../actions/paintings';
import { Button, Container, Form, Header, Icon } from 'semantic-ui-react';

class ArtWorkNewForm extends React.Component {
  state = { title: '', url: '', type: '', medium: '', surface: '', dimensions: '', 
              price: '', dateComplete: '', fileData: '', fireRedirect: false, fileUploading: false };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { title, url, type, medium, surface, dimensions, price, dateComplete, fileData} = this.state;
    const artData = {
      title, url, type_of: type, medium, surface,
      dimensions, price, date_complete: dateComplete, file_data: fileData
    };
    switch(type) {
      case 'painting': 
        this.props.dispatch(createPainting(artData));
      case 'comission': 
        this.props.dispatch(createComission(artData));
      case 'drawing':
        this.props.dispatch(createDrawing(artData));
      default: 
        return {}
    }
    this.setState({ fireRedirect: true });
  }

  onDrop = (photos) => {
    this.toggleUploading();
    this.setState({ fileData: photos[0] });
    // this.props.dispatch(handleUpload(photos[0], this.toggleUploading));
  }

  toggleUploading = () => {
    this.setState({ fileUploading: !this.state.fileUploading });
  }

  render() {
    const { from } = this.props.location.state || '/';
    const { title, type, medium, surface, dimensions, price, dateComplete, fireRedirect } = this.state;
    return (
      <Container as={StyledContainer}>
        <Header as='h1'>{getUrlType(this.props.path)}</Header>
        <Form onSubmit={this.handleSubmit}>
          <Dropzone onDrop={this.onDrop}>
            <Header as='h4'>Drag photo here!</Header>
          </Dropzone>
          <Form.Group widths='equal'>
            <Form.Select
              name='type'
              label='Type'
              placeholder='Painting...'
              options={typeOptions}
              value={type}
              onChange={this.handleChange}
            />
            <Form.Input
              required
              name='title'
              label='Title'
              placeholder='Some Art Title'
              value={title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              required
              name='surface'
              label='Surface'
              placeholder='Canvas...'
              value={surface}
              onChange={this.handleChange}
            />
            <Form.Input
              name='medium'
              label='Medium'
              placeholder='Oil'
              value={medium}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              required
              name='dimensions'
              label='Dimensions'
              placeholder='10 x 10'
              value={dimensions}
              onChange={this.handleChange}
            />
            <Form.Input
              name='price'
              type='number'
              label='Price'
              placeholder='$450.00'
              value={price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              required
              type='date'
              name='dateComplete'
              label='Date Complete'
              placeholder='Some date...'
              value={dateComplete}
              onChange={this.handleChange}
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Button color='black' onClick={this.props.history.goBack}><Icon name='arrow left' />Back</Button>
            <Form.Button color='black'><Icon name='check' />Submit</Form.Button>
          </Form.Group>
        </Form>
        {
          fireRedirect && (
            <Redirect to={from || `/admin-${type}s`} />
          )
        }
      </Container>
    )
  }
}

const typeOptions = [
  { key: 'comission', text: 'comission', value: 'comission' },
  { key: 'drawing', text: 'drawing', value: 'drawing' },
  { key: 'painting', text: 'painting', value: 'painting' },
]

const getUrlType = (baseUrl) => {
  const foo = baseUrl.split('/')[1];
  const foo2 = foo.split('admin-')[1];
  const foo3 = foo2.charAt(0).toUpperCase() + foo2.slice(1);
  return <h1>New {foo3} Form</h1>
}

export default connect()(ArtWorkNewForm);