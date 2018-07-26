import React from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { connect, } from 'react-redux';
import { setFlash, } from '../actions/flash';
import { setHeaders, } from '../actions/headers';
import { Button, Icon, } from 'semantic-ui-react';

class DeleteModal extends React.Component {

  handleClick = () => {
    axios.delete(`/api/artworks/${this.props.artWorkId}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.props.onClose();
        this.props.goBack();
        this.props.dispatch(setFlash('Successfully Deleted.', 'green'));
      })
      .catch( err => {
        this.props.dispatch(setFlash(err.response, 'red'));
      })
  };

  render() {
    // TODO: Edit design and convert to styled-components
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <br />
        <h1>
          <Icon name='warning sign' color='yellow' size='large' />
          Delete { this.props.title }
        </h1>
        <div>
          <p>Are you sure you want to delete?</p>
        </div>
        <div>
          <Button onClick={this.props.onClose}>
            <Icon name='remove' color='red' />
            No
          </Button>
          <Button onClick={this.handleClick}>
            <Icon name='checkmark' color='green' />
            Yes
          </Button>
        </div>
      </Modal>
    );
  };
};

export default connect()(DeleteModal);
