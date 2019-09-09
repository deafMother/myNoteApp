const getSingleNote = (note = null, action) => {
  switch (action.type) {
    case 'LOAD_SINGLE_NOTE':
      return { ...action.payload };
    default:
      return note;
  }
};

export default getSingleNote;
