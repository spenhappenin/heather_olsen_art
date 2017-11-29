const paintings = (state = [], action) => {
  switch(action.type) {
    case 'GET_PAINTINGS':
      return action.paintings;
    case 'CREATE_PAINTING':
      console.log(action);
    default: 
      return state;
  }
}

export default paintings;