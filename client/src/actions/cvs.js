import axios from 'axios';

export const fetchCvs = () => {
  return(dispatch) => {
    axios.get('api/cvs')
      .then( res => {
        const data = res.data;
        dispatch({ type: 'GET_CVS', cvs: data })
      })
      .catch( err => {
        // TODO: Flash message
        console.log(err);
      })
  }
}