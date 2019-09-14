import axios from '../api/fetch-notes';
import uid from 'uuid';
import history from '../history';
import bcrypt from 'bcryptjs';

export const createNote = status => {
  return {
    type: 'CREATE_NOTE',
    payload: status
  };
};

// fetch all the notes
export const fetchNotes = () => async (dispatch, getState) => {
  try {
    dispatch(network(true));
    const response = await axios.get('/notes.json');
    console.log(getState().loggedIn.username);
    const newData = convertObjectToArray(
      response,
      getState().loggedIn.username
    );
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
  dispatch(displayPopUp(popup));

  setTimeout(() => {
    popup.show = false;
    dispatch(displayPopUp(popup));
  }, 4000);
};

// get  notes of eact type
export const getNotesType = type => async (dispatch, getState) => {
  try {
    network(true);
    const response = await axios.get('/notes.json');
    const newData = convertObjectToArray(
      response,
      getState().loggedIn.username
    );
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

// add user to database, add the crypted password
export const addNewUser = formvalue => async dispatch => {
  const popup = {
    message: 'User Added',
    error: false,
    show: true
  };

  // bcrypt
  // salt is used to hash the password, 10 is the default round value
  const salt = await bcrypt.genSalt(10);
  // now create the hash
  formvalue.password1 = await bcrypt.hash(formvalue.password1, salt);
  formvalue.password2 = formvalue.password1;

  try {
    const users = await axios.get('/users.json');
    if (users.data) {
      if (
        Object.values(users.data).find(
          user =>
            user.username.toLowerCase() === formvalue.username.toLowerCase()
        )
      ) {
        // user already registered
        popup.message = 'User Already Exists';
        popup.error = true;
      } else {
        const user = await axios.post('/users.json', formvalue);
        // dispatch successfully registered
      }
    } else {
      //  no users so can add the new user
      const user = await axios.post('/users.json', formvalue);
    }
  } catch (err) {
    popup.message = 'network error!';
    popup.error = true;
  }
  history.push('/');
  dispatch(displayPopUp(popup));

  setTimeout(() => {
    popup.show = false;
    dispatch(displayPopUp(popup));
  }, 4000);
};

// login user, pop up yet to be implemented
export const LoginIn = formValues => async dispatch => {
  const popup = {
    message: 'Logged In',
    error: false,
    show: true
  };
  let status = {
    status: false,
    username: null
  };
  try {
    const users = await axios.get('/users.json');
    // if users exists check compare to check if the particular user is there or not
    if (users.data) {
      const hashedPassword = Object.values(users.data).find(
        user => user.username === formValues.username
      );
      // if user exists in the database

      if (hashedPassword) {
        const isMatch = await bcrypt.compare(
          formValues.password,
          hashedPassword.password1
        );

        if (isMatch) {
          status.status = true;
          status.username = formValues.username;
        } else {
          popup.message = 'incorrect passoword';
          popup.error = true;
        }
      } else {
        popup.message = 'please check user name or register';
        popup.error = true;
      }
    } else {
      // now users in database
      popup.message = 'user not registered, please register';
      popup.error = true;
    }
  } catch (err) {
    popup.message = 'nework error';
    popup.error = true;
  }

  dispatch(isLoggedIn(status));
  history.push('/');
  dispatch(displayPopUp(popup));

  setTimeout(() => {
    popup.show = false;
    popup.error = false;
    dispatch(displayPopUp(popup));
  }, 4000);
};
// action createor for logged in
export const isLoggedIn = status => {
  return {
    type: 'LOGGEN_IN',
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

const convertObjectToArray = (response, username) => {
  let newData = [];
  if (response.data) {
    const keys = Object.keys(response.data);
    const values = Object.values(response.data);
    newData = values
      .map((item, index) => {
        item.id = keys[index];
        return item;
      })
      .filter(note => note.username === username);
  }
  // if (newData) {
  //   console.log(newData);

  //   return newData;
  // } else {
  //   console.log(newData);

  //   return [];
  // }

  return newData;
};
