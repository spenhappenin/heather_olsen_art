const paintings = (state = [], action) => {
  switch(action.type) {
    case 'GET_PAINTINGS':
      return action.paintings;
    case 'CREATE_PAINTING':
      return [action.painting, ...state];
    case 'DELETE_PAINTING':
      return state.filter( p => p.id !== action.painting);
    default: 
      return state;
  }
}

export default paintings;