const paintings = (state = [], action) => {
  switch(action.type) {
    case 'GET_PAINTINGS':
      return action.paintings;
    default: 
      return state;
  }
}

export default paintings;