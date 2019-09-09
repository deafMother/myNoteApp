const allNotes = (notes = [], action) => {
  switch (action.type) {
    case 'LOAD_NOTES':
      return [...action.payload];
    case 'ADD_NOTE':
      return [...notes, action.payload];

    default:
      return notes;
  }
};

export default allNotes;
