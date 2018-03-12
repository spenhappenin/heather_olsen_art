import { combineReducers } from 'redux'
import comissions from './comissions';
import cvs from './cvs';
import drawings from './drawings';
import totalPages from './totalPages';
import paintings from './paintings';
import flash from './flash';
import user from './user';

const rootReducer = combineReducers({
  comissions,
  cvs,
  drawings,
  flash,
  totalPages,
  paintings,
  user,
})

export default rootReducer