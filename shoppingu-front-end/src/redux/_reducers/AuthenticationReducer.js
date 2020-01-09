import { authConstants } from "../_actions/type";
import { SUCCESS, FAIL } from "../../_constants";
import jwtDecode from "jwt-decode";

const initialState = {
  item: {
    isAuthenticated: false,
    token: "",
    id: "",
    role: "",
    name: "",
    profileImage: ""
  },
  messages: [],
  isFetching: false,
  isFail: false
};

const getStatus = Status => {
  switch (Status) {
    case SUCCESS:
      return { isFetching: false, isFail: false };
    case FAIL:
      return { isFetching: false, isFail: true };
    default:
      return { isFetching: true, isFail: false, messages: [] };
  }
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    // clear messages
    case authConstants.CLEAR_MESSAGES_AUTHENTICATION:
      return { ...state, messages: [] };

    // sign in
    case authConstants.SIGNIN_REQUEST:
      return { ...state, ...getStatus() };
    case authConstants.SIGNIN_SUCCESS:
      console.log("getProductInMyCart")
      payload = {
        ...payload,
        result: { ...payload.result, ...jwtDecode(payload.result.token) }
      };
      const {
        id,
        email,
        role,
        firstName,
        lastName,
        phoneNumber,
        profileImage
      } = payload.result;
      return {
        item: {
          isAuthenticated: true,
          id,
          email,
          role,
          phoneNumber,
          firstName,
          lastName,
          fullName: `${firstName} ${lastName}`,
          profileImage
        },
        messages: payload.messages,
        ...getStatus(SUCCESS)
      };
    case authConstants.SIGNIN_FAILURE:
      return {
        ...state,
        ...getStatus(FAIL),
        messages: payload.messages
      };

    //sign out
    case authConstants.SIGNOUT_REQUEST:
      return { ...state, ...getStatus() };
    case authConstants.SIGNOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        item: {
          isAuthenticated: false
        },
        messages: payload.messages,
        ...getStatus(SUCCESS)
      };
    case authConstants.SIGNOUT_FAILURE:
      return { ...state, ...getStatus(FAIL), messages: payload.messages };

    default:
      return state;
  }
}
