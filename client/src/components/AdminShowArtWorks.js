import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';
import { formatArt, } from '../helpers/artWorks';
import { getCategoryTitle, } from '../helpers/artWorks';
import { setFlash, } from '../actions/flash';
import { Header, StyledContainer, } from '../styles/shared';
import { Grid, Image, Transition, } from 'semantic-ui-react';

class AdminShowArtWorks extends React.Component {
  state = { artWorks: [], categoryTitle: '', erroredImages: [], };

  componentDidMount() {
    const { match: { params: { work_title, }, }, } = this.props;
    
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

  displayArtWorks = () => {
    const { artWorks, erroredImages, visible, } = this.state;

    if (!artWorks) return;

    return artWorks.map( (a, i) => {
      return erroredImages.includes(a.id) ?
        null
      :
        <Grid.Column key={i} mobile={8} tablet={4} computer={4} style={styles.flex}>
          <Transition visible={visible} animation='fade' duration={2000}>
            <Link to={`${this.props.location.pathname}/${a.id}`} rel="noopener noreferrer">
              <Image
                alt={a.title}
                fluid
                href={a.src}
                onError={() => this.handleImageError(a.id)}
                src={a.src}
              />
            </Link>
          </Transition>
        </Grid.Column>
    });
  };

  handleImageError = (id) => this.setState({ erroredImages: [...this.state.erroredImages, id], });

  render() {
    const { categoryTitle, } = this.state;

    return(
      <StyledContainer>
        <Header primary>{ categoryTitle }</Header>
        <Grid>
          { this.displayArtWorks() }
        </Grid>
      </StyledContainer>
    );
  };
};

const styles = {
  flex: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default connect()(AdminShowArtWorks);
