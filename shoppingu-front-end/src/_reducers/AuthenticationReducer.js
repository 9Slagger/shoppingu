import { authConstants } from "../_actions/type";
import { SUCCESS, FAIL } from "../_constants";

const initialState = {
  item: {
    isAuthenticated: false,
    token: "",
    id: "",
    role: "",
    name: "",
    profileImage: ""
  },
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
      return { isFetching: true, isFail: false };
  }
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case authConstants.SIGNIN_REQUEST:
      return { ...payload, ...getStatus() };
    case authConstants.SIGNIN_SUCCESS:
      const { id, role, firstName, lastName, profileImage } = payload;
      const fullName = `${firstName} ${lastName}`;
      return {
        item: {
          isAuthenticated: true,
          id,
          role,
          firstName,
          lastName,
          fullName,
          profileImage
        },
        ...getStatus(SUCCESS)
      }
    case authConstants.SIGNIN_FAILURE:
      return { ...state, ...getStatus(FAIL) };

    case authConstants.SIGNOUT_REQUEST:
      return { ...state, ...getStatus() };
    case authConstants.SIGNOUT_SUCCESS:
      return {
        item: {
          isAuthenticated: false
        },
        ...getStatus(SUCCESS)
      };
    case authConstants.SIGNOUT_FAILURE:
      return { ...state, ...getStatus(FAIL) };

    default:
      return state;
  }
}
