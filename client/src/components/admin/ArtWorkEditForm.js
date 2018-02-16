import React from 'react';
import DeleteArtWorkModal from './DeleteArtWorkModal';
import { connect } from 'react-redux';
import { Header } from '../../styles/shared';
import { Redirect } from 'react-router-dom';
import { StyledContainer, Button } from '../../styles/shared';
import { updateComission } from '../../actions/comissions';
import { updatePainting } from '../../actions/paintings';
import { updateDrawing } from '../../actions/drawings';
import { statusOptions, typeOptions } from '../../helpers/data';
import { Form, Icon, Image, Segment } from 'semantic-ui-react';

class ArtWorkEditForm extends React.Component {
  state = {
    title: '', url: '', type: '', medium: '', surface: '', dimensions: '',
    price: '', dateComplete: '', fileData: '', status: '', fireRedirect: false, fileUploading: false, 
    open: false
  };

  componentWillMount() {
    const { fetchArtWorks, dispatch } = this.props;
    dispatch(fetchArtWorks());
  }

  componentDidMount() {
    const { type, src, title, medium, surface, dimensions, price, status, dateComplete, fileData } = this.props.work;
    this.setState({ type, url: src, medium, surface, dimensions, price, dateComplete, title, status, fileData });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    const { work, work: { id }, dispatch } = this.props;
    switch(work.type) {
      case 'comission':
        dispatch(updateComission({ ...this.state, id }));
        break;
      case 'painting':
        dispatch(updatePainting({ ...this.state, id }));
        break;
      case 'drawing':
        dispatch(updateDrawing({ ...this.state, id }));
        break;
      default:
        return {};
    }
    this.setState({ fireRedirect: true });
    // window.location.reload();
  }

  show = () => () => this.setState({ open: true });

  close = () => this.setState({ open: false });


  render() {
    const { from } = this.props.location.state || '/';
    const { work, work: {id} } = this.props;
    const { title, type, medium, surface, dimensions, price, status, dateComplete, fireRedirect, open, url } = this.state;

    return(
      <Segment as={StyledContainer} basic>
        <Header primary>"{ work.title }" Edit Page</Header>
        <Button onClick={this.props.history.goBack}><Icon name='arrow left' />Back</Button>
        <Button onClick={this.show()}>Delete</Button>
        <DeleteArtWorkModal artWorkTitle={title} artWorkId={id} open={open} onClose={this.close} type={this.props.type} goBack={this.props.history.goBack} />
        <br />
        <br />
        <Image alt={title} src={url} size='small'/>
        <Form onSubmit={this.handleSubmit}>
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
            <Form.Select
              required
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
          <Form.Group widths='equal'>
            <Form.Input
              required
              type='url'
              name='url'
              label='Image URL'
              placeholder='https://image-url.com'
              value={url}
              onChange={this.handleChange}
            />
          </Form.Group>
          <br />
          <Button type='submit'>Submit</Button>
        </Form>
        { fireRedirect && <Redirect to={from || `/admin-${type}s`} /> }
      </Segment>
    )
  }
}

const mapStateToProps = (state, props) => {
  switch(props.type) {
    case 'comission': 
      return { work: state.comissions.find( c => c.id === parseInt(props.match.params.id, 10)) };
    case 'painting': 
      return { work: state.paintings.find( p => p.id === parseInt(props.match.params.id, 10)) };
    case 'drawing':
      return { work: state.drawings.find( d => d.id === parseInt(props.match.params.id, 10)) };
    default: 
      return {};
  }
}

export default connect(mapStateToProps)(ArtWorkEditForm);