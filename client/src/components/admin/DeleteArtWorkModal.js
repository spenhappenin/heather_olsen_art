import React from 'react';
import axios from 'axios';
import Modal from 'react-responsive-modal';
import { connect, } from 'react-redux';
import { setFlash, } from '../../actions/flash';
import { setHeaders, } from '../../actions/headers';
import { Button, Icon, } from 'semantic-ui-react';

class DeleteArtWorkModal extends React.Component {

  handleClick = () => {
    axios.delete(`/api/artworks/${this.props.artWorkId}`)
      .then( res => {
        this.props.onClose();
        this.props.goBack();
        this.props.dispatch(setHeaders(res.headers));
        this.props.dispatch(setFlash('Comission successfully deleted.', 'green'));
      })
      .catch( err => {
        const { response: { headers, }, } = err;

        this.props.dispatch({ type: 'SET_HEADERS', headers });
        this.props.dispatch(setFlash('Failed to update comission at this time. Please try again later.', 'red'));
      })
  };

  render() {
    // TODO: Edit design and convert to styled-components
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <br />
        <h1>
          <Icon name='warning sign' color='yellow' size='large' />
          Delete { this.props.artWorkTitle }
        </h1>
        <div>
          <p>Are you sure you want to delete {this.props.cv_title}?</p>
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

export default connect()(DeleteArtWorkModal);
