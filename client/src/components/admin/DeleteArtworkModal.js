import React, { useContext, } from "react";
import axios from "axios";
import Modal from "react-responsive-modal";
import { FlashContext, } from "../../providers/FlashProvider";
import { Button, Icon, } from "semantic-ui-react";

const DeleteArtworkModal = (props) => {
  const { setFlash, } = useContext(FlashContext);

  const handleClick = () => {
    axios.delete(`/api/admin/artworks/artworks/${props.artWorkId}`)
      .then( () => {
        props.onClose();
        props.goBack();
        setFlash("Artwork Deleted", "green");
      })
      .catch( err => {
        setFlash(err.response, "red");
      })
  };

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <br />
      <h1>
        <Icon name="warning sign" color="yellow" size="large" />
        Delete {props.artWorkTitle}
      </h1>
      <div>
        <p>Are you sure you want to delete {props.cv_title}?</p>
      </div>
      <div>
        <Button onClick={props.onClose}>
          <Icon name="remove" color="red" />
          No
        </Button>
        <Button onClick={handleClick}>
          <Icon name="checkmark" color="green" />
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteArtworkModal;
