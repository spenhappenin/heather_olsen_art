import axios from 'axios';
import { formatArt } from '../helpers/artWorks';
import { setFlash } from './flash';

export const fetchDrawings = () => {
  return(dispatch) => {
    axios.get('/api/drawings')
      .then( res => {
        const data = res.data;
        const drawings = [];
        data.map( drawing => {
          drawings.push(formatArt(drawing));
        })
        dispatch({ type: 'GET_DRAWINGS', drawings });
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch(setFlash(message, 'error'));
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
      .then(res => {
        let data = res.data;
        dispatch({ type: 'CREATE_DRAWING', drawing: data });
      })
      .catch( res => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch(setFlash(message, 'error'));
      })
  }
}

export const updateDrawing = (drawing) => {
  return (dispatch => {
    axios.put(`/api/art_works/${drawing.id}`, drawing)
      .then(res => {
        dispatch({ type: 'UPDATE_DRAWING', drawing })
      })
      .catch(res => {
        debugger
      })
  })
}


export const deleteDrawing = (id) => {
  return(dispatch) => {
    axios.delete(`/api/art_works/${id}`)
      .then( res => {
        const { headers } = res;
        dispatch({ type: 'DELETE_DRAWING', id, headers });
      })
      .catch( err => {
        const message = 'Sorry, there was an error with your request. See your awesome developer for more details.';
        dispatch(setFlash(message, 'error'));
      })
  }
}