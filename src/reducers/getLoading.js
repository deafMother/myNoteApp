const getLoading = (loading = false, action) => {
  switch (action.type) {
    case 'LOADING':
      return action.payload;
    default:
      return loading;
  }
};

export default getLoading;
