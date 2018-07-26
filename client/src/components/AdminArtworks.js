import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';
import { setFlash, } from '../actions/flash';
import { setHeaders, } from '../actions/headers';
import { Transition, } from 'semantic-ui-react';
import { generateImageUrl, getCategoryTitle, } from '../helpers/artWorks';
import { Button, Header, StyledContainer, } from '../styles/shared';

class AdminArtworks extends React.Component {
  state = { artWorks: [], categoryTitle: '', erroredImages: [], windowWidth: window.innerWidth, };

  componentDidMount() {
    const { match: { params: { work_title, }, }, } = this.props;
    
    window.addEventListener('resize', this.handleResize);
    axios.get(`/api/artworks?category=${work_title}`)
      .then( res => {
        const { dispatch, } = this.props;
        dispatch(setHeaders(res.headers));
        this.setState({ artWorks: res.data, categoryTitle: getCategoryTitle(work_title), });
      })
      .catch( err => {
        this.props.dispatch(setFlash(err.response, 'red'))
      })
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  };

  displayArtWorks = () => {
    const { artWorks, erroredImages, visible, } = this.state;

    if (!artWorks) return;

    return artWorks.map( a => {
      return erroredImages.includes(a.id) ?
        null
      :
        <Column>
          <Transition visible={visible} animation='fade' duration={2000}>
            <Link to={`edit/${a.id}`} rel="noopener noreferrer">
              <Image
                alt={a.title}
                onError={() => this.handleImageError(a.id)}
                srcSet={[
                  `${generateImageUrl(a.url, 1100)} 1024w`, 
                  `${generateImageUrl(a.url, 750)} 750w`
                ]}
              />
            </Link>
          </Transition>
        </Column>
    });
  };

  handleImageError = (id) => this.setState({ erroredImages: [...this.state.erroredImages, id], });

  handleResize = () => this.setState({ windowWidth: window.innerWidth, });

  render() {
    const { categoryTitle, windowWidth, } = this.state;

    return(
      <StyledContainer>
        <Header primary>{ categoryTitle }</Header>
        <Link to={`${this.props.path}/new`} rel="noopener noreferrer">
          <Button>New</Button>
        </Link>
        <br />
        <br />
        <Grid width={windowWidth}>
          { this.displayArtWorks() }
        </Grid>
      </StyledContainer>
    );
  };
};

const Grid = styled.div`
  display: grid;
  grid-gap: 25px;
  /* TODO: Better way to break on mobile? */
  grid-template-columns: ${ props => `repeat(${props.width <= 750 ? 2 : 4}, 1fr)` };
`;

const Column = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;
`;

export default connect()(AdminArtworks);
