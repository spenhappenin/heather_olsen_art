import React from 'react';
import { Image, Modal } from 'semantic-ui-react';

class ArtWorkShow extends React.Component {
  render() {
    return(
      <Modal.Content style={styles.content} >
        <Image src={this.props.comission.url} style={styles.img}/>
      </Modal.Content>
    )
  }
}

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    background: 'rgba(0, 0, 0, 0.5)'
  },
  img: {
    height: '90vh',
    zIndex: '1',
  }
}

export default ArtWorkShow;