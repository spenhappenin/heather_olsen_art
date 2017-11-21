import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Header, Image } from 'semantic-ui-react';

class ArtWorks extends React.Component {

  componentDidMount() {
    const { fetchArtWorks, dispatch } = this.props;
    dispatch(fetchArtWorks());
  }

  componentWillReceiveProps(nextProps){
    const { dispatch } = this.props;
    if(nextProps.title !== this.props.title)
      dispatch(nextProps.fetchArtWorks());
  }

  displayArtWorks = () => {
    switch(this.props.type) {
      case 'comission':
        return this.props.comissions.map(comission => 
          <Grid.Column width={4} key={comission.id}>
            <Image src={comission.url} fluid />
          </Grid.Column>
        )
      case 'painting':
        return this.props.paintings.map(painting =>
          <Grid.Column width={4} key={painting.id}>
            <Image src={painting.url} fluid />
          </Grid.Column>
        )
    }
  }

  render() {
    return (
      <Container>
        <Header as='h1'>{this.props.title}</Header>
        <Grid>
          {this.displayArtWorks()}
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  switch(props.type) {
    case 'comission':
      return { comissions: state.comissions }
      case 'painting':
      return { paintings: state.paintings }
    default: 
      return {};
  }
}

export default connect(mapStateToProps)(ArtWorks);

// switch (props.type) {
//   case 'comission':
//     return { works: state.comissions }
//   case 'painting':
//     return { works: state.paintings }
//   default:
//     return {};
// }


// displayArtWorks = () => {
//   return this.props.works.map(comission =>
//     <Grid.Column width={4} key={comission.id}>
//       <Image src={comission.url} fluid />
//     </Grid.Column>
//   )
// }