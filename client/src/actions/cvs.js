import axios from 'axios';
import { setFlash } from './flash';

export const fetchCvs = () => {  
  return(dispatch) => {
    axios.get('api/cvs')
      .then( res => {
        const { data: cvs } = res;
        dispatch({ type: 'GET_CVS', cvs });
      })
      .catch( res => {
        // const { response: { headers } } = res;
        // dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to retrieve CV records at this time. Please try again later.', 'red'));
      })
  }
}

export const createCv = (cv) => {
  return(dispatch) => {
    axios.post('/api/cvs', cv)
      .then( res => {
        const { data: cv, headers } = res;
        dispatch({ type: 'CREATE_CV', cv, headers });
        dispatch(setFlash('Cv Record Successfully Created.', 'green'));
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to create CV record at this time. Please try again later.', 'red'));
      })
  }
}

export const updateCv = (cv, id) => {
  return(dispatch) => {
    axios.put(`api/cv/${id}`, cv)
      .then( res => {
        const { data: cv, headers } = res;
        dispatch({ type: 'UPDATE_CV', cv, headers });
        dispatch(setFlash('Cv Record Successfully Updated.', 'green'));
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to update CV record at this time. Please try again later.', 'red'));
      })
  }
}

export const deleteCv = (id) => {
  return(dispatch) => {
    axios.delete(`/api/cvs/${id}`)
      .then( res => {
        const { headers } = res;
        dispatch({ type: 'DELETE_CV', id, headers });
        dispatch(setFlash('Cv Record Successfully Deleted!', 'green'));
      }) 
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to delete CV record at this time. Please try again later.', 'red'));
      })
  }
}