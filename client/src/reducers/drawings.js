const drawings = (state = [], action) => {
  switch(action.type) {
    case 'GET_DRAWINGS':
      return action.drawings;
    case 'CREATE_DRAWING':
      return [action.drawing, ...state];
    case 'UPDATE_DRAWING':
      return state.map( d => {
        if (action.drawing.id === d.id)
          return action.drawing;
        return d;
      })
    case 'DELETE_DRAWING': 
      return state.filter( d => d.id !== action.id);
    default: 
      return state;
  }
}

export default drawings;