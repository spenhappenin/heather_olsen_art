import React from 'react';
import axios from 'axios';

class ShowArtWorks extends React.Component {
  state = { artWorks: [], };

  componentDidMount() {
    axios.get(`/api/artworks?category=${this.props.match.params.work_title}`)
      .then( res => {
        this.setState({ artWorks: res.data });
      })
      .catch( err => {
        // TODO: Error handle
        console.log(err.response)
      })
  };

  render() {
    return(
      <div>
        <h1>ArkWorks</h1>
      </div>
    );
  };
};

export default ShowArtWorks;
