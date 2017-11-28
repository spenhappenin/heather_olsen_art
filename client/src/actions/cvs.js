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

export const updateCv = (cv, id) => {
  return(dispatch) => {
    axios.put(`api/cvs/${id}`, cv)
      .then( res => {
        const cv = res.data;
        dispatch({ type: 'UPDATE_CV', cv })
      })
      .catch( err => {
        console.log(err);
      })
  }
}