import React from 'react';
import { Link, } from 'react-router-dom';
import { Lazy } from 'react-lazy';
import { Image, Transition, } from 'semantic-ui-react';

class Artwork extends React.Component {
  render() {
    return (
        <Lazy> 
      
          <Image
            alt={this.props.title}
            fluid
            href={this.props.src}
            onError={() => this.handleImageError(this.props.id)}
            src={this.props.src}
          />
      
        </Lazy> 
    )
  }
}

export default Artwork;
