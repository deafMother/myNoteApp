import { combineReducers } from 'redux';
import createNote from './createNote';
import allNotes from './allNotes';
import getNoteType from './getNoteType';
import getSingleNote from './getSingleNote';
import getLoading from './getLoading';
import getNetwork from './getNetwork';
import getPopUp from './getPopUp';

export default combineReducers({
  create: createNote,
  notes: allNotes,
  list: getNoteType,
  note: getSingleNote,
  loading: getLoading,
  net: getNetwork,
  popup: getPopUp
});
