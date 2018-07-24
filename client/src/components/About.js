import React from 'react';
import { Form, } from 'semantic-ui-react';
import { Header, StyledContainer, } from '../styles/shared';

class About extends React.Component {
  render() {
    return(
      <StyledContainer>
        <Header primary>Heather Olsen</Header>
        <br />
        <br />
        {
          this.props.user ? 
            <Form>
              <Form.Group widths='equal'>
                <Form.TextArea label='Bio' placeholder='This is a bio...' style={{ height: '200px' }} />
              </Form.Group>
            </Form>
          :
            <p>Content</p>
        }
      </StyledContainer>
    );
  };
};

export default About;
