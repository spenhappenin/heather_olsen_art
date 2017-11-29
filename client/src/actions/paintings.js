import axios from 'axios';

export const fetchPaintings = () => {
  return(dispatch) => {
    axios.get('/api/paintings')
      .then(res => {
        let data = res.data;
        dispatch({ type: 'GET_PAINTINGS', paintings: data });
      })
      .catch(err => {
        // TODO: Flash message
        console.log(err);
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
    data.append('date_complete', painting.date_complete);
    axios.post('/api/art_works', data)
      .then( res => {
        let data = res.data;
        dispatch({ type: 'CREATE_PAINTING', painting: data });
      })
      .catch( err => {
        console.log(err)
      })
  }
}