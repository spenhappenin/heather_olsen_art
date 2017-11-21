import { combineReducers } from 'redux'
import comissions from './comissions';
import paintings from './paintings';
import flash from './flash'
import user from './user'

const rootReducer = combineReducers({
  comissions,
  flash,
  paintings,
  user,
})

export default rootReducer