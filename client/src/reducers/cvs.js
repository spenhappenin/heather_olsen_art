const cvs = (state = [], action) => {
  switch(action.type) {
    case 'GET_CVS':
      return action.cvs;
    case 'CREATE_CV':
      return [action.cv, ...state]
    case 'UPDATE_CV':
      return state.map( c => {
        if(c.id === action.cv.id)
          return action.cv
        return c
      })
      case 'DELETE_CV':
        return state.filter( cv => cv.id !== action.id)
    default: 
      return state;
  }
}

export default cvs;