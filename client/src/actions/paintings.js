import axios from 'axios';
import { formatArt } from '../helpers/artWorks';
import { setFlash } from './flash';

export const fetchPaintings = (cb = () => {}, page, trigger = false) => {
  return(dispatch) => {
    axios.get(`/api/paintings?page=${page}`)
    .then( res => {
        const { data: { total_pages, art_works } } = res;
        const paintings = art_works.map( painting => {
          return formatArt(painting) 
        });
        dispatch({ type: 'GET_PAINTINGS', paintings });
        dispatch({ type: 'GET_NUM_PAGES', totalPages: total_pages });
        if(trigger) {
          dispatch({ type: 'INC_CURRENT_PAGE' });
        }
        cb();
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to retrieve paintings at this time. Please try again later.', 'red'));
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
        const { data: painting, headers } = res;
        dispatch({ type: 'CREATE_PAINTING', painting, headers });
        dispatch(setFlash('Painting successfully added.', 'green'));
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to add painting at this time. Please try again later.', 'red'));
      })
  }
}

export const updatePainting = (painting) => {
  return (dispatch => {
    axios.put(`/api/art_works/${painting.id}`, painting)
      .then( res => {
        const { data: painting, headers } = res;
        dispatch({ type: 'UPDATE_PAINTING', painting, headers });
        dispatch(setFlash('Painting successfully updated.', 'green'));
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to update painting at this time. Please try again later.', 'red'));
      })
  })
}

export const deletePainting = (id) => {
  return(dispatch) => {
    axios.delete(`/api/art_works/${id}`)
      .then( res => {
        const { headers } = res;
        dispatch(setFlash('Painting successfully deleted.', 'green'));
        dispatch({ type: 'DELETE_PAINTING', id, headers });
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to delete painting at this time. Please try again later.', 'red'));
      })
  }
}