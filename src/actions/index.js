import axios from '../api/fetch-notes';
import uid from 'uuid';
import history from '../history';

export const createNote = status => {
  return {
    type: 'CREATE_NOTE',
    payload: status
  };
};

// fetch all the notes
export const fetchNotes = () => async dispatch => {
  try {
    dispatch(network(true));
    const response = await axios.get('/notes.json');
    const newData = convertObjectToArray(response);
    dispatch({
      type: 'LOAD_NOTES',
      payload: newData
    });
  } catch (err) {
    console.log('no network');
    dispatch(network(false));
  }
};

// add a new note
export const addNote = note => async dispatch => {
  note.id = uid.v4();
  note.createdAt = Date.now();
  const popup = {
    message: 'Note Successfully Created',
    error: false,
    show: true
  };
  try {
    network(true);
    const response = await axios.post('/notes.json', note);
    dispatch({
      type: 'ADD_NOTE',
      payload: response.data
    });
  } catch (err) {
    console.log('no network');
    network(false);
    popup.message = 'Error adding note !';
    popup.error = true;
  }
  history.push('/');
  console.log(popup.show);
  dispatch(displayPopUp(popup));

  setTimeout(() => {
    popup.show = false;
    dispatch(displayPopUp(popup));
  }, 4000);
};

// get  notes of eact type
export const getNotesType = type => async dispatch => {
  try {
    network(true);
    const response = await axios.get('/notes.json');
    const newData = convertObjectToArray(response);
    const noteType = newData.filter(note => note.type === type);
    dispatch({
      type: 'GET_LIST_TYPE',
      payload: noteType
    });
  } catch (err) {
    console.log('no network');
    network(false);
  }
};

// get a single note
export const fetchNote = id => async dispatch => {
  try {
    network(true);
    const response = await axios.get(`/notes/${id}.json`);
    //console.log(response.data);
    dispatch({
      type: 'LOAD_SINGLE_NOTE',
      payload: response.data
    });
  } catch (err) {
    console.log('no network');
    network(false);
  }
};

// edit a note
export const editNote = (id, note) => async dispatch => {
  const popup = {
    message: 'Changes Saved',
    error: false,
    show: true
  };
  try {
    network(true);
    const response = await axios.patch(`/notes/${id}.json`, note);
    // currently there is no reducer for this action as it is not required
    dispatch({
      type: 'NOTE_EDITED',
      payload: response.data
    });
  } catch (err) {
    console.log('no network');
    network(false);
    popup.message = 'Error Editing note !';
    popup.error = true;
  }

  history.push('/');
  dispatch(displayPopUp(popup));

  setTimeout(() => {
    popup.show = false;
    dispatch(displayPopUp(popup));
  }, 4000);
};

// remove note
export const deleteNote = id => async dispatch => {
  const popup = {
    message: 'Note Deleted',
    error: false,
    show: true
  };
  try {
    network(true);
    await axios.delete(`/notes/${id}.json`);
    // currently there is no reducer for this action as it is not required
    dispatch({
      type: 'NOTE_DELETED'
    });
  } catch (err) {
    console.log('no network');
    network(false);
    popup.message = 'Error Deleting note !';
    popup.error = true;
  }

  history.push('/');
  dispatch(displayPopUp(popup));

  setTimeout(() => {
    popup.show = false;
    dispatch(displayPopUp(popup));
  }, 4000);
};

// loading, can be use to keep tract of loading
export const loading = status => {
  return {
    type: 'LOADING',
    payload: status
  };
};

// network status, can be use to keep tract of network connection
export const network = status => {
  return {
    type: 'NETWORK',
    payload: status
  };
};

//  message type will be an obeject
const displayPopUp = message => {
  return {
    type: 'POPUP',
    payload: message
  };
};

const hidePopUp = status => {
  return {
    type: 'POPUP_HIDE',
    payload: status
  };
};

const convertObjectToArray = response => {
  let newData = [];

  if (response.data) {
    const keys = Object.keys(response.data);
    const values = Object.values(response.data);
    newData = values.map((item, index) => {
      item.id = keys[index];
      return item;
    });
  }
  return newData;
};
