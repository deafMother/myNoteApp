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
  }
  history.push('/');
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
  }

  history.push('/');
};

// remove note
export const deleteNote = id => async dispatch => {
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
  }

  history.push('/');
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
  console.log(status);
  return {
    type: 'NETWORK',
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
