import React from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import { connect, } from 'react-redux';
import { Form, } from 'semantic-ui-react';
import { setFlash, } from '../actions/flash';
import { setHeaders, } from '../actions/headers';
import { StyledDropzone, } from '../styles/artWork';
import { Button, Header, StyledContainer, } from '../styles/shared';

class About extends React.Component {
  state = { artist_statement: '', bio: '', fileData: '', fileUploading: false, image: '', };

  componentDidMount() {
    axios.get('/api/fetch_about')
      .then( res => {
        const { data: { artist_statement, bio, image, }, headers, } = res;

        this.props.dispatch(setHeaders(headers));
        this.setState({ artist_statement, bio, image, });
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
    let data = new FormData();
    let photo = this.state.fileData;
    data.append(photo.name, photo);
    data.append('bio', this.state.bio);
    data.append('artist_statement', this.state.artist_statement);
    axios.put('/api/user_bio_statement', data)
      .then( res => {
        const { data: { artist_statement, bio, image, }, headers, } = res;
        this.props.dispatch(setHeaders(headers));
        this.props.dispatch(setFlash('About Content Updated!', 'green'));
        this.setState({ artist_statement, bio, image, });
      })
      .catch( err => {
        this.props.dispatch(setFlash(err.response, 'red'));
      })
  };

  onDrop = (photos) => {
    this.toggleUploading();
    this.setState({ fileData: photos[0], });
  };

  toggleUploading = () => this.setState({ fileUploading: !this.state.fileUploading, });

  render() {
    return(
      <StyledContainer>
        <Header primary>About</Header>
        <br />
        <br />
        {
          this.props.user.id ? 
            <Form onSubmit={this.handleSubmit}>
              <Header>Image</Header>
              <div style={{ display: 'flex', }}>
                <StyledDropzone onDrop={this.onDrop}>
                  {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                    if (isDragActive) {
                      return "This file is authorized";
                    }
                    if (isDragReject) {
                      return "This file is not authorized";
                    }
                    return acceptedFiles.length || rejectedFiles.length ? 
                      <h4 textAlign='center'>{`Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`}</h4>
                    : 
                      <h4 textAlign='center'>Drag photo here or click to select a file.</h4>;
                  }}
                </StyledDropzone>
                <Image src={this.state.image} />
              </div>
              <br />
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
              <Image src={this.state.image} client />
              <br />
              <br />
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
  ['bold', 'italic', 'underline'],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ['link']
];

const Image = styled.img`
  height: 250px;
  margin-left: ${ props => props.client ? null : '100px'};
`;

const mapStateToProps = (state) => {
  return { user: state.user, };
};

export default connect(mapStateToProps)(About);
