import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';
import { formatArt, } from '../helpers/artWorks';
import { getCategoryTitle, } from '../helpers/artWorks';
import { setFlash, } from '../actions/flash';
import { Button, Header, StyledContainer, } from '../styles/shared';
import { Image, Transition, } from 'semantic-ui-react';

class AdminShowArtWorks extends React.Component {
  state = { artWorks: [], categoryTitle: '', erroredImages: [], windowWidth: window.innerWidth, };

  componentDidMount() {
    const { match: { params: { work_title, }, }, } = this.props;
    
    window.addEventListener('resize', this.handleResize);
    axios.get(`/api/artworks?category=${work_title}`)
      .then( res => {
        const art = [];
        res.data.map( a => art.push(formatArt(a)) );
        this.setState({ artWorks: art, categoryTitle: getCategoryTitle(work_title), });
      })
      .catch( err => {
        this.props.dispatch(setFlash('An error has occured, please try again later.', 'red'))
      })
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  };

  displayArtWorks = () => {
    const { artWorks, erroredImages, visible, } = this.state;

    if (!artWorks) return;

    return artWorks.map( (a, i) => {
      return erroredImages.includes(a.id) ?
        null
      :
        <Column>
          <Transition visible={visible} animation='fade' duration={2000}>
            <Link to={`edit/${a.id}`} rel="noopener noreferrer">
              <Image
                alt={a.title}
                fluid
                href={a.src}
                onError={() => this.handleImageError(a.id)}
                src={a.src}
              />
            </Link>
          </Transition>
        </Column>
    });
  };

  handleImageError = (id) => this.setState({ erroredImages: [...this.state.erroredImages, id], });

  handleResize = (e) => this.setState({ windowWidth: window.innerWidth });

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

export default connect()(AdminShowArtWorks);
