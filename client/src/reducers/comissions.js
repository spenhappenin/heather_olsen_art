const comissions = (state = [], action) => {
  switch(action.type) {
    case 'GET_COMISSIONS':
      return action.comissions;
    default: 
      return state;
  }
}

export default comissions;