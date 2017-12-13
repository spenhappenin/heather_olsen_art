import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { StyledContainer } from '../../styles/shared';
import { Button, Container, Header, Form, Icon } from 'semantic-ui-react';

class ArtWorkEditForm extends React.Component {
  state = {
    title: '', url: '', type: '', medium: '', surface: '', dimensions: '',
    price: '', dateComplete: '', fileData: '', fireRedirect: false, fileUploading: false
  };

  componentWillMount() {
    const { fetchArtWorks, dispatch } = this.props;
    dispatch(fetchArtWorks());
  }

  componentDidMount() {
    const { type, url, title, medium, surface, dimensions, price, dateComplete, fileData } = this.props.work;
    this.setState({ type, url, medium, surface, dimensions, price, dateComplete, title, fileData });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }


  render() {
    const { work } = this.props;
    const { title, type, medium, surface, dimensions, price, dateComplete, fireRedirect } = this.state;
    return(
      <Container as={StyledContainer}>
        <Header as='h1'>{ work.title } Edit Form</Header>
        <Form>
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

      </Container>
    )
  }
}

const typeOptions = [
  { key: 'comission', text: 'comission', value: 'comission' },
  { key: 'drawing', text: 'drawing', value: 'drawing' },
  { key: 'painting', text: 'painting', value: 'painting' },
]

const mapStateToProps = (state, props) => {
  switch(props.type) {
    case 'comission': 
      return { work: state.comissions.find( c => c.id === parseInt(props.match.params.id)) };
    case 'painting': 
      return { work: state.paintings.find( p => p.id === parseInt(props.match.params.id)) };
    case 'drawing':
      return { work: state.drawings.find( d => d.id === parseInt(props.match.params.id)) };
    default: 
      return {};
  }
}

export default connect(mapStateToProps)(ArtWorkEditForm);