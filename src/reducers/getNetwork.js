const getNetwork = (net = true, action) => {
  switch (action.type) {
    case 'NETWORK':
      return action.payload;
    default:
      return net;
  }
};

export default getNetwork;
