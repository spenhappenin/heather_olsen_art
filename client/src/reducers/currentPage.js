const currentPage = (state = 1, action) => {
  switch (action.type) {
    case 'INC_CURRENT_PAGE':
      // debugger
      return action.currentPage
    default:
      return state;
  }
}

export default currentPage;