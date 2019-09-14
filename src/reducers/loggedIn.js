const initialState = {
  status: false,
  username: null
};

const getLoggenIn = (loggenIn = initialState, action) => {
  switch (action.type) {
    case 'LOGGEN_IN':
      return { ...action.payload };
    default:
      return loggenIn;
  }
};

export default getLoggenIn;
