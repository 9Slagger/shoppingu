import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import AuthenticationReducer from './AuthenticationReducer'

export default history =>
  combineReducers({
    Authentication: AuthenticationReducer,
    router: connectRouter(history)
  })