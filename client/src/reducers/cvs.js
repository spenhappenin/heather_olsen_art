const cvs = (state = [], action) => {
  switch(action.type) {
    case 'GET_CVS':
      return action.cvs;
    default: 
      return state;
  }
}

export default cvs;