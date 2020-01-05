import { authConstants } from "./type";
import serviceApi from "../_services/api";
// import { history } from "../routers";

export const clearMessages = () => {
  
  return dispatch => {
    dispatch({
      type: authConstants.CLEAR_MESSAGES
    });
  }
}

export const signin = (email, password) => {
  return async dispatch => {
    dispatch({
      type: authConstants.SIGNIN_REQUEST
    });
    try {
      const data = await serviceApi.signin({
        email,
        password
      });
      console.warn("payload", data)
      dispatch({ type: authConstants.SIGNIN_SUCCESS, payload: data });
    } catch (error) {
      console.warn("error", error)
      dispatch({ type: authConstants.SIGNIN_FAILURE, payload: error });
    }
  };
};

export const signout = () => {
  return async dispatch => {
    dispatch({
      type: authConstants.SIGNOUT_REQUEST
    })
    try {
      const data = await serviceApi.signout()
      dispatch({ type: authConstants.SIGNOUT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: authConstants.SIGNOUT_FAILURE, payload: error });
    }
  }
}