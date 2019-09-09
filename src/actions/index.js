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
  console.log(true);
  const response = await axios.get('/notes');
  dispatch({
    type: 'LOAD_NOTES',
    payload: response.data
  });
  console.log(false);
};

// add a new note
export const addNote = note => async dispatch => {
  note.id = uid.v4();
  note.createdAt = Date.now();
  const response = await axios.post('/notes', note);

  dispatch({
    type: 'ADD_NOTE',
    payload: response.data
  });
  history.push('/');
};

// get  notes of eact type
export const getNotesType = type => async dispatch => {
  const response = await axios.get('/notes');
  const noteType = response.data.filter(note => note.type === type);
  dispatch({
    type: 'GET_LIST_TYPE',
    payload: noteType
  });
};

// get a single note
export const fetchNote = id => async dispatch => {
  const response = await axios.get(`/notes/${id}`);
  //console.log(response.data);
  dispatch({
    type: 'LOAD_SINGLE_NOTE',
    payload: response.data
  });
};

// edit a note
export const editNote = (id, note) => async dispatch => {
  const response = await axios.patch(`/notes/${id}`, note);

  console.log(response.data);

  // currently there is no reducer for this action as it is not required
  dispatch({
    type: 'NOTE_EDITED',
    payload: response.data
  });

  history.push('/');
};

// remove note
export const deleteNote = id => async dispatch => {
  await axios.delete(`/notes/${id}`);
  // currently there is no reducer for this action as it is not required
  dispatch({
    type: 'NOTE_DELETED'
  });

  history.push('/');
};

// loading, can be use to keep tract of loading
export const loading = status => {
  console.log(status);
  return {
    type: 'LOADING',
    payload: status
  };
};
