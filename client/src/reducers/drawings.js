const drawings = (state = [], action) => {
  switch(action.type) {
    case 'GET_DRAWINGS':
      return action.drawings;
    case 'CREATE_DRAWING':
      return [action.drawing, ...state];
    case 'UPDATE_DRAWING':
      return [action.drawing, ...state];
    case 'DELETE_DRAWING': 
      return state.filter( d => d.id !== action.drawing);
    default: 
      return state;
  }
}

export default drawings;