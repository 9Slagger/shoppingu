import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import AuthenticationReducer from "./AuthenticationReducer";
import CartRducer from "./CartRducer";

export default history =>
  combineReducers({
    router: connectRouter(history),
    Authentication: AuthenticationReducer,
    Cart: CartRducer
  });
