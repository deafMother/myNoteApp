const popup = {
  message: '',
  show: false,
  error: false
};

const getPopUp = (message = popup, action) => {
  switch (action.type) {
    case 'POPUP':
      return { ...action.payload };
    default:
      return message;
  }
};

export default getPopUp;
