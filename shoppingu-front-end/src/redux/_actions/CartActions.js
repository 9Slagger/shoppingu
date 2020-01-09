import { cartConstants } from "./type";
import { serviceCart } from "../../_services";
// import { history } from "../routers";

export const getProductInMyCart = () => {
  return async dispatch => {
    dispatch({
      type: cartConstants.CART_REQUEST
    });
    try {
      let data = await serviceCart.getProductInMyCart();
      dispatch({ type: cartConstants.CART_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: cartConstants.CART_FAILURE, payload: error });
    }
  };
};
