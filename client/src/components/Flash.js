import React from 'react';
import '../styles/flash.css';
import { connect } from 'react-redux';
import { FlashMessage } from '../styles/flash';
import { clearFlash } from '../actions/flash';
import { Container, Header, Message } from 'semantic-ui-react';

const fadeFlash = (dispatch) => {
  setTimeout( () => {
    dispatch(clearFlash());
  }, 3000)
}

const Flash = ({ flash, dispatch }) => {
  if(flash.message) {
    return(
      <Container as={FlashMessage}>
        <Message
          onDismiss={() => dispatch(clearFlash())}
          color={flash.msgType}
        >
          <Header as='h5' textAlign='center'>{ flash.message }</Header>
          { fadeFlash(dispatch) }
        </Message>
      </Container>
    )
  } else {
    return null;
  }
}

const mapStateToProps = (state) => {
  return { flash: state.flash };
}

export default connect(mapStateToProps)(Flash);