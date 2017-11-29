const paintings = (state = [], action) => {
  switch(action.type) {
    case 'GET_PAINTINGS':
      return action.paintings;
    case 'CREATE_PAINTING':
      return [action.painting, ...state];
    default: 
      return state;
  }
}

export default paintings;