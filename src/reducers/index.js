import { combineReducers } from 'redux';
import createNote from './createNote';
import allNotes from './allNotes';
import getNoteType from './getNoteType';
import getSingleNote from './getSingleNote';
import getLoading from './getLoading';

export default combineReducers({
  create: createNote,
  notes: allNotes,
  list: getNoteType,
  note: getSingleNote,
  loading: getLoading
});
