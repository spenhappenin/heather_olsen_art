import { combineReducers } from 'redux'
import comissions from './comissions';
import drawings from './drawings';
import paintings from './paintings';
import flash from './flash'
import user from './user'

const rootReducer = combineReducers({
  comissions,
  drawings,
  flash,
  paintings,
  user,
})

export default rootReducer