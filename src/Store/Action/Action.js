import { createAction } from "redux-actions";
import {
  SHOW_MESSAGE,
  SHOW_ERROR,
  CLEAR_MESSAGE_ERROR,
  GET_PRODUCTS,
  USER_LOGIN,
  CLEAR_USER,
  APP_INIT,
  GET_CATEGORIES
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

export const actionEditProduct = product => dispatch => {
  return API.editProduct(product).then(res => {
    if (res.status === 200) {
      dispatch(actionShowMessage("Success. Product edit. Changes accepted"));
    } else {
      dispatch(actionShowError("Failure. Product not edit"));
    }

    return res;
  });
};

export const actionAddComment = (productId, text, commentId) => dispatch => {
  return API.addComment(productId, text, commentId).then(res => {
    if (res.status === 200) {
      dispatch(actionShowMessage("Success. Comment added"));
    }

    return res;
  });
};

export const actionGetProductsSuccess = createAction(GET_PRODUCTS);
export const actionClearMessageError = createAction(CLEAR_MESSAGE_ERROR);
export const actionShowError = createAction(SHOW_ERROR);
export const actionShowMessage = createAction(SHOW_MESSAGE);
export const actionUserLogin = createAction(USER_LOGIN);
export const actionClearUser = createAction(CLEAR_USER);
export const actionAppInit = createAction(APP_INIT);
