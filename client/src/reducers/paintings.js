const paintings = (state = [], action) => {
  switch(action.type) {
    case 'GET_PAINTINGS':
      return action.paintings;
    case 'CREATE_PAINTING':
      return [action.painting, ...state];
    case 'UPDATE_PAINTING':
      return state.map( p => {
        if (action.painting.id === p.id)
          return action.painting;
        return p;
      })
    case 'DELETE_PAINTING':
      return state.filter( p => p.id !== action.id);
    default: 
      return state;
  }
}

export default paintings;