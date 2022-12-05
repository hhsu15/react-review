import { combineReducers } from 'redux';
import { selectFilesReducer, diffFilesReducer } from './fileReducer';

export default combineReducers({
  selectedFile: selectFilesReducer,
  diffResult: diffFilesReducer
});
