import axios from 'axios';
import { formatArt } from '../helpers/artWorks';
import { setFlash } from './flash';

export const fetchDrawings = (cb = () => {}) => {
  return(dispatch) => {
    axios.get('/api/drawings')
      .then( res => {
        const { data } = res;
        const drawings = [];
        data.map( drawing => drawings.push(formatArt(drawing)) );
        dispatch({ type: 'GET_DRAWINGS', drawings });
        cb();
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to retrieve drawings at this time. Please try again later.', 'red'));
      })
  }
}

export const createDrawing = (drawing) => {
  return (dispatch) => {
    let data = new FormData();
    let photo = drawing.file_data;
    // TODO: Loop this shit
    data.append(photo.name, photo);
    data.append('type_of', drawing.type_of);
    data.append('title', drawing.title);
    data.append('medium', drawing.medium);
    data.append('surface', drawing.surface);
    data.append('dimensions', drawing.dimensions);
    data.append('price', drawing.price);
    data.append('status', drawing.status);
    data.append('date_complete', drawing.date_complete);
    axios.post('/api/art_works', data)
      .then( res => {
        const { data: drawing } = res;
        dispatch({ type: 'CREATE_DRAWING', drawing });
        dispatch(setFlash('Drawing successfully added.', 'green'));
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to add drawing at this time. Please try again later.', 'red'));
      })
  }
}

export const updateDrawing = (drawing) => {
  return (dispatch => {
    axios.put(`/api/art_works/${drawing.id}`, drawing)
      .then( res => {
        const { data: drawing, headers } = res;
        dispatch({ type: 'UPDATE_DRAWING', drawing, headers });
        dispatch(setFlash('Drawing successfully updated.', 'green'));
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to update drawing at this time. Please try again later.', 'red'));
      })
  })
}


export const deleteDrawing = (id) => {
  return(dispatch) => {
    axios.delete(`/api/art_works/${id}`)
      .then( res => {
        const { headers } = res;
        dispatch({ type: 'DELETE_DRAWING', id, headers });
        dispatch(setFlash('Drawing successfully deleted.', 'success'));
      })
      .catch( res => {
        const { response: { headers } } = res;
        dispatch({ type: 'SET_HEADERS', headers });
        dispatch(setFlash('Failed to delete drawings at this time. Please try again later.', 'red'));
      })
  }
}