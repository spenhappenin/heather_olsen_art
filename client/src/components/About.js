import React from 'react';
import axios from 'axios';
import { connect, } from 'react-redux';
import { Form, } from 'semantic-ui-react';
import { setFlash, } from '../actions/flash';
import { setHeaders, } from '../actions/headers';
import { Button, Header, StyledContainer, } from '../styles/shared';

class About extends React.Component {
  state = { artist_statement: '', bio: '', };

  componentDidMount() {
    axios.get('/api/fetch_about')
      .then( res => {
        const { data: { artist_statement, bio }, headers, } = res;

        this.props.dispatch(setHeaders(headers));
        this.setState({ artist_statement, bio });
      })
      .catch( err => {
        this.props.dispatch(setFlash(err.response, 'red'));
      })
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value, });

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/user_bio_statement', { ...this.state, })
      .then( res => {
        const { data: { artist_statement, bio }, headers, } = res;

        this.props.dispatch(setHeaders(headers));
        this.props.dispatch(setFlash('About Content Updated!', 'green'));
        this.setState({ artist_statement, bio, });
      })
      .catch( err => {
        this.props.dispatch(setFlash(err.response, 'red'));
      })
  };

  render() {
    return(
      <StyledContainer>
        <Header primary>About</Header>
        <br />
        <br />
        {
          this.props.user.id ? 
            <Form onSubmit={this.handleSubmit}>
              <Form.Group widths='equal'>
                <Form.TextArea 
                  label='Bio' 
                  name='bio'
                  onChange={this.handleChange}
                  placeholder='This is a bio...' 
                  style={{ height: '200px' }} 
                  value={this.state.bio}
                />
              </Form.Group>
              <Form.Group widths='equal'>
                <Form.TextArea 
                  label='Artist Statement' 
                  name='artist_statement'
                  onChange={this.handleChange}
                  placeholder='This is an artist statement...' 
                  style={{ height: '200px' }} 
                  value={this.state.artist_statement}
                />
              </Form.Group>
              <Button type='submit'>Submit</Button>
            </Form>
          :
            <div>
              <p>{this.state.bio}</p>
              <br />
              <br />
              <Header style={{ fontSize: '22px', }}>Artist Statement</Header>
              <p>{this.state.artist_statement}</p>
            </div>
        }
      </StyledContainer>
    );
  };
};

const mapStateToProps = (state) => {
  return { user: state.user, };
};

export default connect(mapStateToProps)(About);
