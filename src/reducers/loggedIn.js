const getLoggenIn = (loggenIn = false, action) => {
  switch (action.type) {
    case 'LOGGEN_IN':
      return action.payload;
    default:
      return loggenIn;
  }
};

export default getLoggenIn;
