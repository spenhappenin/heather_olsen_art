import React from 'react';
import { connect, } from 'react-redux';
import { deleteComission, } from '../../actions/comissions';
import { deleteDrawing, } from '../../actions/drawings';
import { deletePainting, } from '../../actions/paintings';
import { Button, Icon, Modal, } from 'semantic-ui-react';

class DeleteArtWorkModal extends React.Component {

  handleClick = () => {
    const { dispatch, type, artWorkId } = this.props;
    switch(type) {
      case 'comission':
        dispatch(deleteComission(artWorkId));
        this.props.goBack();
        break;
      case 'painting':
        dispatch(deletePainting(artWorkId));
        this.props.goBack();
        break;
      case 'drawing':
        dispatch(deleteDrawing(artWorkId));
        this.props.goBack();
        break;
      default: 
        return {};
    }
  }

  render() {
    return (
      <Modal size='tiny' open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>
          <Icon name='warning sign' color='yellow' size='large' />
          Delete { this.props.artWorkTitle }
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
            <Icon name='checkmark' color='green' />
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect()(DeleteArtWorkModal);