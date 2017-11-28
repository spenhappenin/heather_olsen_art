const cvs = (state = [], action) => {
  switch(action.type) {
    case 'GET_CVS':
      return action.cvs;
    case 'UPDATE_CV':
      return state.map( c => {
        if(c.id === action.cv.id)
          return action.cv
        return c
      })
    default: 
      return state;
  }
}

export default cvs;