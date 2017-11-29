import axios from 'axios';

export const fetchComissions = () => {
  return(dispatch) => {
    axios.get('/api/comissions')
      .then( res => {
        let { data } = res;
        dispatch({ type: 'GET_COMISSIONS', comissions: data })
      })
      .catch( err => {
        // TODO: Flash message error
        console.log(err)
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
    axios.post('/api/art_works', data)
      .then(res => {
        let data = res.data;
        dispatch({ type: 'CREATE_COMISSION', comission: data });
      })
      .catch(err => {
        console.log(err)
      })
  }
}