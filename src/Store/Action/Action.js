import { createAction } from "redux-actions";
import {
  SHOW_MESSAGE,
  SHOW_ERROR,
  CLEAR_STORE,
  GET_PRODUCTS,
  USER_LOGIN
} from "./Type";
import { API } from "../../Service/API";

export const actionGetProducts = ({ size, page } = {}) => dispatch => {
  API.getProducts({ size, page }).then(res => {
    if (res.status === 200) {
      dispatch(actionGetProductsSuccess(res.body));
    } else {
      dispatch(actionShowError("Sorry. Server error"));
    }
  });
};

export const actionAddProduct = product => dispatch => {
  return API.addProduct(product).then(res => {
    if (res.status === 200) {
      dispatch(actionShowMessage("Products added"));
    } else if (res.status !== 400) {
      dispatch(actionShowError("Sorry. Error. Component not added"));
    }

    return res;
  });
};

export const actionDeleteProduct = id => dispatch => {
  return API.deleteProduct(id).then(res => {
    if (res.status === 200) {
      dispatch(actionShowMessage("Success. Product removed"));
    } else {
      dispatch(actionShowError("Failure. Product not removed"));
    }

    return res;
  });
};

export const actionEditProduct = (id, product) => dispatch => {
  return API.editProduct(id, product).then(res => {
    if (res.status === 200) {
      dispatch(actionShowMessage("Success. Product edit. Changes accepted"));
    } else {
      dispatch(actionShowError("Failure. Product not edit"));
    }

    return res;
  });
};

export const actionGetProductsSuccess = createAction(GET_PRODUCTS);
export const actionClearStore = createAction(CLEAR_STORE);
export const actionShowError = createAction(SHOW_ERROR);
export const actionShowMessage = createAction(SHOW_MESSAGE);
export const actionUserLogin = createAction(USER_LOGIN);
