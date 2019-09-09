const createNote = (create = false, action) => {
  if (action.type === 'CREATE_NOTE') {
    return action.payload;
  } else {
    return create;
  }
};

export default createNote;
