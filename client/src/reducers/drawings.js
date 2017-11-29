const drawings = (state = [], action) => {
  switch(action.type) {
    case 'GET_DRAWINGS':
      return action.drawings;
    case 'CREATE_DRAWING':
      return [action.drawing, ...state];
    default: 
      return state;
  }
}

export default drawings;