import axios from 'axios';
import { formatArt } from '../helpers/artWorks';
import { setFlash } from './flash';

export const fetchComissions = (cb = () => {}) => {
  return(dispatch) => {
    axios.get('/api/comissions')
      .then( res => {
        let { data } = res;
        const comissions = [];
        data.map( comission => comissions.push(formatArt(comission)) );
        dispatch({ type: 'GET_COMISSIONS', comissions });
        cb();
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to retrieve comissions at this time. Please try again later.', 'red'));
      })
  }
}

export const createComission = (comission) => {
  return(dispatch) => {
    let data = new FormData();
    let photo = comission.file_data;
    // TODO: Loop this?
    data.append(photo.name, photo);
    data.append('type_of', comission.type_of);
    data.append('title', comission.title);
    data.append('medium', comission.medium);
    data.append('surface', comission.surface);
    data.append('dimensions', comission.dimensions);
    data.append('price', comission.price);
    data.append('date_complete', comission.date_complete);
    data.append('status', comission.status);
    axios.post('/api/art_works', data)
      .then( res => {
        const { data: comission, headers } = res;
        dispatch({ type: 'CREATE_COMISSION', comission, headers });
        dispatch(setFlash('Comission successfully added.', 'green'));
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to add comission at this time. Please try again later.', 'red'));
      })
  }
}

export const updateComission = (comission) => {
  return(dispatch => {
    axios.put(`/api/art_works/${comission.id}`, comission)
      .then( res => {
        const { data: comission, headers } = res;
        dispatch({ type: 'UPDATE_COMISSION', comission, headers });
        dispatch(setFlash('Comission successfully updated.', 'green'));
      }) 
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to update comission at this time. Please try again later.', 'red'));
      })
  })
}

export const deleteComission = (id) => {
  return(dispatch) => {
    axios.delete(`/api/art_works/${id}`)
      .then( res => {
        const { headers } = res;
        dispatch({ type: 'DELETE_COMISSION', id, headers });
        dispatch(setFlash('Comission successfully deleted.', 'green'));
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to update comission at this time. Please try again later.', 'red'));
      })
  }
}