import axios from 'axios';

export const fetchDrawings = () => {
  return(dispatch) => {
    axios.get('/api/drawings')
      .then( res => {
        const data = res.data;
        dispatch({ type: 'GET_DRAWINGS', drawings: data });
      })
      .catch( err => {
        // TODO: Flash message
        console.log(err)
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
    data.append('date_complete', drawing.date_complete);
    axios.post('/api/art_works', data)
      .then(res => {
        let data = res.data;
        dispatch({ type: 'CREATE_DRAWING', drawing: data });
      })
      .catch(err => {
        console.log(err)
      })
  }
}