import { createAction } from "redux-actions";
import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  GET_PRODUCTS
} from "./Type";
import { API } from "../../API";

export const actionGetProducts = ({ size, page } = {}) => dispatch => {
  API.getProducts({ size, page }).then(res =>
    dispatch(actionGetProductsSuccess(res.body))
  );
};

export const actionGetProductsSuccess = createAction(GET_PRODUCTS);
export const actionDeleteProduct = createAction(DELETE_PRODUCT);
export const actionAddProduct = createAction(ADD_PRODUCT);
export const actionEditProduct = createAction(EDIT_PRODUCT);
