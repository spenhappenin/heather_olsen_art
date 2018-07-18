import { combineReducers } from 'redux'
import cvs from './cvs';
import flash from './flash';
import user from './user';

const rootReducer = combineReducers({
  cvs,
  flash,
  user,
})

export default rootReducer