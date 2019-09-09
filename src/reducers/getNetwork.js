const getNetwork = (net = true, action) => {
  console.log(action.payload);
  switch (action.type) {
    case 'NETWORK':
      console.log(action.payload);
      return action.payload;
    default:
      return net;
  }
};

export default getNetwork;
