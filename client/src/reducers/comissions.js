const comissions = (state = [], action) => {
  switch(action.type) {
    case 'GET_COMISSIONS':
      return action.comissions;
    case 'CREATE_COMISSION':
      return [action.comission, ...state];
    default: 
      return state;
  }
}

export default comissions;