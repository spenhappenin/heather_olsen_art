import axios from 'axios';
import { setFlash } from './flash';

export const fetchCvs = () => {  
  return(dispatch) => {
    axios.get('api/cvs')
      .then( res => {
        const data = res.data;
        dispatch({ type: 'GET_CVS', cvs: data })
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch(setFlash(message, 'error'));
      })
  }
}

export const createCv = (cv) => {
  return(dispatch) => {
    axios.post('/api/cvs', cv)
      .then( res => {
        const cv = res.data;
        dispatch({ type: 'CREATE_CV', cv });
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch(setFlash(message, 'error'));
      })
  }
}

export const updateCv = (cv, id) => {
  return(dispatch) => {
    axios.put(`api/cv/${id}`, cv)
      .then( res => {
        const cv = res.data;
        dispatch({ type: 'UPDATE_CV', cv })
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch(setFlash(message, 'error'));
      })
  }
}

export const deleteCv = (id) => {
  return(dispatch) => {
    axios.delete(`/api/cvs/${id}`)
      .then(res => {
        const { headers } = res;
        dispatch({ type: 'DELETE_CV', id, headers });
      }) 
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch(setFlash(message, 'error'));
      })
  }
}