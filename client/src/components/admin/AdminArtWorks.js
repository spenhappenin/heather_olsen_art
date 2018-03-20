import React from 'react';
import Copyright from '../shared/Copyright';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { incCurrentPage } from '../../actions/currentPage';
import { Link } from 'react-router-dom';
import { Header, Button, StyledContainer } from '../../styles/shared';
import { Grid, Image, Loader, Segment, Transition } from 'semantic-ui-react';

class AdminArtWorks extends React.Component {
  state = { loaded: false, visible: false };

  setLoaded = () => this.setState({ loaded: true });

  componentDidMount() {
    this.setState({ visible: !this.state.visible });
  }

  // componentWillReceiveProps(nextProps) {
  //   const { dispatch } = this.props;
  //   const { page } = this.state;
  //   if (nextProps.title !== this.props.title)
  //     dispatch(nextProps.fetchArtWorks(), page);
  // }

  loadMore = () => {
    const { currentPage, dispatch, fetchArtWorks } = this.props;
    const { page } = this.state;
    dispatch(fetchArtWorks(this.setLoaded, currentPage + 1, true))
  }

  displayArtWorks = () => {
    return this.props.works.map( work =>
      <Grid.Column key={work.id} mobile={16} tablet={8} computer={4}>
        <Transition visible={this.state.visible} animation='fade' duration={1000}>
          <Link to={`${this.props.path}/${work.id}`} rel="noopener noreferrer">
            <Image 
              alt={work.title}
              src={work.src} 
              onError={
                (e) => 
                  { e.target.src = "https://res.cloudinary.com/dtb6lx1s4/image/upload/v1518813497/ImageNotAvailable_owzy6a.png" }
              } 
              fluid 
            />
          </Link>
        </Transition>
      </Grid.Column>
    )
  }

  render() {
    const { currentPage, totalPages } = this.props;

    return(
      <Segment as={StyledContainer} basic>
        <Header primary>{this.props.title}</Header>
        <Link to={`${this.props.path}/new`} rel="noopener noreferrer">
          <Button>New</Button>
        </Link>
        <br />
        <br />
        <InfiniteScroll
          pageStart={1}
          loadMore={this.loadMore}
          hasMore={currentPage < totalPages}
          loader={<div key="loader">Loading...</div>}
          initialLoad={false}
          // useWindow={false}
          >
          <Grid>
            {this.displayArtWorks()}
          </Grid>
        </InfiniteScroll>
        <Copyright />
      </Segment>
    )
  }
}

const mapStateToProps = (state, props) => {
  switch (props.type) {
    case 'comission':
      return { works: state.comissions, totalPages: state.totalPages, currentPage: state.currentPage }
    case 'painting':
      return { works: state.paintings, totalPages: state.totalPages, currentPage: state.currentPage }
    case 'drawing':
      return { works: state.drawings, totalPages: state.totalPages, currentPage: state.currentPage }
    default:
      return {};
  }
}

const styles = {
  scroller: {
    height: '65vh',
    overflow: 'auto'
  }
}

export default connect(mapStateToProps)(AdminArtWorks);