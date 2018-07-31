import React from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
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

  handleChange = (value, name) => {
    this.setState({ [name]: value, });
  };

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
              <Form.Field>
                <Header>Bio</Header>
                <ReactQuill
                  modules={{ toolbar, }}
                  value={this.state.bio}
                  onChange={(value) => this.handleChange(value, 'bio')} 
                />
              </Form.Field>
              <Form.Field>
                <Header>Artist Statement</Header>
                <ReactQuill
                  modules={{ toolbar, }}
                  value={this.state.artist_statement}
                  onChange={(value) => this.handleChange(value, 'artist_statement')} 
                />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
          :
            <div>
              <p dangerouslySetInnerHTML={createMarkup(this.state.bio)} />
              <br />
              <br />
              <Header style={{ fontSize: '22px', }}>Artist Statement</Header>
              <p dangerouslySetInnerHTML={createMarkup(this.state.artist_statement)} />
            </div>
        }
      </StyledContainer>
    );
  };
};

const createMarkup = (html) => {
  return { __html: html };
};

const toolbar = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['link'],
  ['clean'],
];

const mapStateToProps = (state) => {
  return { user: state.user, };
};

export default connect(mapStateToProps)(About);
