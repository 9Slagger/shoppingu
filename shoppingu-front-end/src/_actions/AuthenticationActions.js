import { AUTHENTICATION_SUCESS, authConstants } from "./type";
import serviceApi from "../services/api";
import { history } from "../routers";

export const Authentication = () => {
  return dispatch => {
    dispatch({
      type: AUTHENTICATION_SUCESS,
      payload: { item: { isAuthenticated: true } }
    });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch({
      type: authConstants.AUTHENTICATION_REQUEST
    });
    try {
      const { data } = await serviceApi.login({
        email,
        password
      });
      dispatch({ type: authConstants.AUTHENTICATION_SUCCESS, payload: data });
      history.push("/");
    } catch (error) {
      dispatch({ type: authConstants.AUTHENTICATION_FAILURE });
    }
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: authConstants.AUTHENTICATION_REQUEST
    })
    try {
      await serviceApi.logout()
      dispatch({ type: authConstants.AUTHENTICATION_SUCCESS });
    } catch (error) {
      dispatch({ type: authConstants.AUTHENTICATION_FAILURE });
    }
  }
}