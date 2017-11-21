import axios from 'axios';

export const fetchPaintings = () => {
  return(dispatch) => {
    axios.get('/api/paintings')
      .then(res => {
        let data = res.data;
        dispatch({ type: 'GET_PAINTINGS', paintings: data });
      })
      .catch(err => {
        // TODO: Flash message
        console.log(err);
      })
  }
}