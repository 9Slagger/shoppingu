import {
  AUTHENTICATION_FETCH,
  AUTHENTICATION_SUCESS,
  AUTHENTICATION_FAILURE,
  authConstants
} from "../_actions/type";

const initialState = {
  item: { isAuthenticated: false, token: "" },
  items: [],
  isFetching: false,
  isError: false
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case AUTHENTICATION_FETCH:
      return { ...state, isFetching: true, isError: false };
    case AUTHENTICATION_SUCESS:
      return { ...state, ...payload, isFetching: false, isError: false };
    case AUTHENTICATION_FAILURE:
      return { ...state, isFetching: false, isError: true };

    case authConstants.AUTHENTICATION_REQUEST:
      return { ...state, isRequest: true, isFail: false };
    case authConstants.AUTHENTICATION_SUCCESS:
      return { ...state, isRequest: false, isFail: false };
    case authConstants.AUTHENTICATION_FAILURE:
      return { ...state, isRequest: false, isFail: true };

    default:
      return state;
  }
}
