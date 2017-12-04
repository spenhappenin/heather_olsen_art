import axios from 'axios';
import { formatArt } from '../helpers/artWorks';

export const fetchComissions = () => {
  return(dispatch) => {
    axios.get('/api/comissions')
      .then( res => {
        let { data } = res;
        const comissions = [];
        data.map( comission => {
          comissions.push(formatArt(comission));
        })
        dispatch({ type: 'GET_COMISSIONS', comissions })
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