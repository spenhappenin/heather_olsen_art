import React from 'react';
import { connect } from 'react-redux';
import { deleteCv } from '../../actions/cvs';
import { Button, Modal } from 'semantic-ui-react';

class DeleteModal extends React.Component {

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(deleteCv(this.props.cv_id));
  }

  render() {
    return(
      <Modal size='mini' open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>
          Delete CV Item
          </Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete {this.props.cv_title}?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.props.onClose}>
            No
            </Button>
          <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={this.handleClick} />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect()(DeleteModal);