import { cartConstants } from "../_actions/type";
import { SUCCESS, FAIL } from "../../_constants";

const initialState = {
  item: {},
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
    case cartConstants.CLEARMESSAGES_CART:
      return { ...state, messages: [] };

    case cartConstants.CART_REQUEST:
      return { ...state, ...getStatus() };
    case cartConstants.CART_SUCCESS:
      return {
        item: payload.result,
        messages: payload.messages,
        ...getStatus(SUCCESS)
      };
    case cartConstants.CART_FAILURE:
      return {
        ...initialState,
        ...getStatus(FAIL),
        messages: payload.messages
      };

    default:
      return state;
  }
}
