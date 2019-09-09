const getNoteType = (list = [], action) => {
  switch (action.type) {
    case 'GET_LIST_TYPE':
      return [...action.payload];
    default:
      return list;
  }
};

export default getNoteType;
