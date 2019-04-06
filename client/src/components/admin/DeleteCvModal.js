import React from 'react';
// import { deleteCv, } from '../../actions/cvs';
import { Button, Icon, Modal, } from 'semantic-ui-react';

class DeleteModal extends React.Component {

  handleClick = () => {
    // dispatch(deleteCv(this.props.cv_id));
  }

  render() {
    return(
      <Modal size='tiny' open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>
          <Icon name='warning sign' color='yellow' size='large' />
          Delete CV Item
          </Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete {this.props.cv_title}?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.onClose}>
            <Icon name='remove' color='red' />
            No
            </Button>
          <Button onClick={this.handleClick}>
            <Icon name='checkmark' color='green'/>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default DeleteModal;