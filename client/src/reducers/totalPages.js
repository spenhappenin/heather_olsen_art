const totalPages = (state = 0, action) => {
  switch (action.type) {
    case 'GET_NUM_PAGES':
      return action.totalPages;
    default:
      return state;
  }
}

export default totalPages;