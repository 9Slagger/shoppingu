import { authConstants } from "./type";
import { serviceAuth } from "../../_services";
import { getProductInMyCart } from "../_actions/CartActions";
// import { history } from "../routers";

export const clearMessages = () => {
  return dispatch => {
    dispatch({
      type: authConstants.CLEAR_MESSAGES_AUTHENTICATION
    });
  };
};

export const signin = (email, password) => {
  return async dispatch => {
    dispatch({
      type: authConstants.SIGNIN_REQUEST
    });
    try {
      let data = await serviceAuth.signin({
        email,
        password
      });
      dispatch(getProductInMyCart())
      dispatch({ type: authConstants.SIGNIN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: authConstants.SIGNIN_FAILURE, payload: error });
    }
  };
};

export const signout = () => {
  return async dispatch => {
    dispatch({
      type: authConstants.SIGNOUT_REQUEST
    });
    try {
      const data = await serviceAuth.signout();
      dispatch({ type: authConstants.SIGNOUT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: authConstants.SIGNOUT_FAILURE, payload: error });
    }
  };
};
