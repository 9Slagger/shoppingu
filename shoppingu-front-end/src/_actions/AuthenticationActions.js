import { authConstants } from "./type";
import serviceApi from "../_services/api";
// import { push } from 'connected-react-router'
import { history } from "../routers";

export const signin = (email, password) => {
  return async dispatch => {
    dispatch({
      type: authConstants.SIGNIN_REQUEST
    });
    try {
      const { data } = await serviceApi.signin({
        email,
        password
      });
      dispatch({ type: authConstants.SIGNIN_SUCCESS, payload: data });
      history.push(history.location.state.from);
    } catch (error) {
      dispatch({ type: authConstants.SIGNIN_FAILURE });
    }
  };
};

export const signout = () => {
  return async dispatch => {
    dispatch({
      type: authConstants.SIGNOUT_REQUEST
    })
    try {
      await serviceApi.signout()
      dispatch({ type: authConstants.SIGNOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: authConstants.SIGNOUT_FAILURE });
    }
  }
}