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
    
  }
}