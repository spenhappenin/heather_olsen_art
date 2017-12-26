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
        const message = 'Sorry, there was an error with your request.';
        dispatch({ type: 'SET_HEADERS', headers: res.response.headers })
        dispatch(setFlash(message, 'error'));
      })
  }
}

export const createComission = (comission) => {
  return(dispatch) => {
    let data = new FormData();
    let photo = comission.file_data;
    // TODO: Loop this shit
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
        let data = res.data;
        dispatch(setFlash('Comission Successfully Created!', 'success'));
        dispatch({ type: 'CREATE_COMISSION', comission: data });
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch({ type: 'SET_HEADERS', headers: res.response.headers })
        dispatch(setFlash(message, 'error'));
      })
  }
}

export const updateComission = (comission) => {
  return(dispatch => {
    axios.put(`/api/art_works/${comission.id}`, comission)
      .then( res => {
        dispatch(setFlash('Comission Successfully Updated!', 'success'));
        dispatch({ type: 'UPDATE_COMISSION', comission })
      }) 
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch({ type: 'SET_HEADERS', headers: res.response.headers })
        dispatch(setFlash(message, 'error'));
      })
  })
}

export const deleteComission = (id) => {
  return(dispatch) => {
    axios.delete(`/api/art_works/${id}`)
      .then( res => {
        const { headers } = res;
        dispatch(setFlash('Comission Successfully Deleted!', 'success'));
        dispatch({ type: 'DELETE_COMISSION', id, headers });
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch({ type: 'SET_HEADERS', headers: res.response.headers })
        dispatch(setFlash(message, 'error'));
      })
  }
}