import axios from 'axios';

export const fetchDrawings = () => {
  return(dispatch) => {
    axios.get('/api/drawings')
      .then( res => {
        const data = res.data;
        dispatch({ type: 'GET_DRAWINGS', drawings: data });
      })
      .catch( err => {
        // TODO: Flash message
        console.log(err)
      })
  }
}