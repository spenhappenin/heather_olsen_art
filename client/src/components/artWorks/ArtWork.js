import React from 'react';
import { Image } from 'semantic-ui-react';

class ArtWork extends React.Component {
  state = { error: false };

  handleError = (e) => {
    this.setState({ error: true });
  };

  render() {
    const { artWork, i, openLightbox } = this.props;

    return this.state.error ? 
      null
    :
      <Image
        alt={artWork.title}
        src={artWork.src}
        href={artWork.src}
        onClick={(e) => this.openLightbox(i, e)}
        onError={(e) => this.handleError(e)}
        // onError={(e) => { e.target.src ="https://res.cloudinary.com/dtb6lx1s4/image/upload/v1518813497/ImageNotAvailable_owzy6a.png" }}
        fluid
      />
  };
};

export default ArtWork;