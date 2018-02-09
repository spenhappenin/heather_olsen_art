import React from 'react';
import { connect } from 'react-redux';
import { getUrlType } from '../../helpers/artWorks';
import { Redirect } from 'react-router-dom';
import { StyledContainer } from '../../styles/shared';
import { StyledDropzone } from '../../styles/artWork';
import { createComission } from '../../actions/comissions';
import { createDrawing } from '../../actions/drawings';
import { createPainting } from '../../actions/paintings';
import { statusOptions, typeOptions } from '../../helpers/data';
import { Button, Form, Header, Icon, Segment } from 'semantic-ui-react';

class ArtWorkNewForm extends React.Component {
  state = { 
    title: '', url: '', type: '', 
    medium: '', surface: '', dimensions: '', 
    price: '', dateComplete: '', fileData: '', 
    status: '', fireRedirect: false, fileUploading: false 
  };

  componentDidMount() {
    const { path } = this.props;
    // grabs the type from the url
    let type = path.split('-');
    type = type[1].split('/');
    type = type[0];
    type = type.slice(0, -1);
    switch (type) {
      case 'comission':
        this.setState({ type: 'comission' });
        break;
      case 'drawing':
        this.setState({ type: 'drawing' });
        break;
      case 'painting':
        this.setState({ type: 'painting' });
        break;
      default: 
        return null;
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { title, url, type, medium, surface, dimensions, price, status, dateComplete, fileData} = this.state;
    const artData = {
      title, url, type_of: type, medium, surface,
      dimensions, price, date_complete: dateComplete, status, file_data: fileData
    };
    switch(type) {
      case 'painting': 
        this.props.dispatch(createPainting(artData));
        break;
      case 'comission': 
        this.props.dispatch(createComission(artData));
        break;
      case 'drawing':
        this.props.dispatch(createDrawing(artData));
        break;
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
    const { title, type, medium, surface, dimensions, price, status, dateComplete, fireRedirect } = this.state;
    return (
      <Segment as={StyledContainer} basic>
        <Header as='h1'>{getUrlType(this.props.path)}</Header>
        <Form onSubmit={this.handleSubmit}>
          <StyledDropzone onDrop={this.onDrop}>
            {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
              if (isDragActive) {
                return "This file is authorized";
              }
              if (isDragReject) {
                return "This file is not authorized";
              }
              return acceptedFiles.length || rejectedFiles.length
                ? <Header as='h4' textAlign='center'>{`Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`}</Header>
                : <Header as='h4' textAlign='center'>Drag photo here or click to select a file.</Header>;
            }}
          </StyledDropzone>
          <br />
          <Form.Group widths='equal'>
            <Form.Select
              required
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
              placeholder='10 x 10"'
              value={dimensions}
              onChange={this.handleChange}
            />
            <Form.Input
              name='price'
              type='number'
              label='Price'
              placeholder='450.00'
              value={price}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Select
              name='status'
              label='Status'
              placeholder='For Sale'
              options={statusOptions}
              value={status}
              onChange={this.handleChange}
            />
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
      </Segment>
    )
  }
}

export default connect()(ArtWorkNewForm);