import axios from 'axios';
import { formatArt } from '../helpers/artWorks';
import { setFlash } from './flash';

export const fetchPaintings = (cb = () => {}) => {
  return(dispatch) => {
    axios.get('/api/paintings')
      .then( res => {
        let data = res.data;
        const paintings = [];
        data.map( painting => paintings.push(formatArt(painting)) );
        dispatch({ type: 'GET_PAINTINGS', paintings });
        cb();
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch({ type: 'SET_HEADERS', headers: res.response.headers });
        dispatch(setFlash(message, 'error'));
      })
  }
}

export const createPainting = (painting) => {
  return (dispatch) => {
    let data = new FormData();
    let photo = painting.file_data;
    // TODO: Loop this shit
    data.append(photo.name, photo);
    data.append('type_of', painting.type_of);
    data.append('title', painting.title);
    data.append('medium', painting.medium);
    data.append('surface', painting.surface);
    data.append('dimensions', painting.dimensions);
    data.append('price', painting.price);
    data.append('status', painting.status);
    data.append('date_complete', painting.date_complete);
    axios.post('/api/art_works', data)
      .then( res => {
        let data = res.data;
        dispatch({ type: 'CREATE_PAINTING', painting: data });
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch({ type: 'SET_HEADERS', headers: res.response.headers });
        dispatch(setFlash(message, 'error'));
      })
  }
}

export const updatePainting = (painting) => {
  return (dispatch => {
    axios.put(`/api/art_works/${painting.id}`, painting)
      .then( res => {
        dispatch({ type: 'UPDATE_PAINTING', painting })
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch({ type: 'SET_HEADERS', headers: res.response.headers });
        dispatch(setFlash(message, 'error'));
      })
  })
}

export const deletePainting = (id) => {
  return(dispatch) => {
    axios.delete(`/api/art_works/${id}`)
      .then( res => {
        const { headers } = res;
        dispatch({ type: 'DELETE_PAINTING', id, headers });
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch({ type: 'SET_HEADERS', headers: res.response.headers });
        dispatch(setFlash(message, 'error'));
      })
  }
}