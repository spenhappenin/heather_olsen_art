import { combineReducers } from 'redux'
import comissions from './comissions';
import cvs from './cvs';
import drawings from './drawings';
import paintings from './paintings';
import flash from './flash'
import user from './user'

const rootReducer = combineReducers({
  comissions,
  cvs,
  drawings,
  flash,
  paintings,
  user,
})

export default rootReducer