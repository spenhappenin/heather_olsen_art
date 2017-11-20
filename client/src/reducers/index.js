import { combineReducers } from 'redux'
import comissions from './comissions';
import flash from './flash'
import user from './user'

const rootReducer = combineReducers({
  comissions,
  flash,
  user,
})

export default rootReducer