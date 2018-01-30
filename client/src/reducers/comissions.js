const comissions = (state = [], action) => {
  switch(action.type) {
    case 'GET_COMISSIONS':
      return action.comissions;
    case 'CREATE_COMISSION':
      return [action.comission, ...state];
    case 'UPDATE_COMISSION':
      return state.map( c => {
        if(action.comission.id === c.id)
          return action.comission;
        return c;
      })
    case 'DELETE_COMISSION':
      return state.filter( c => c.id !== action.id);
    default: 
      return state;
  }
}

export default comissions;