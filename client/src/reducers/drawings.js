const drawings = (state = [], action) => {
  switch(action.type) {
    case 'GET_DRAWINGS':
      return action.drawings;
    default: 
      return state;
  }
}

export default drawings;