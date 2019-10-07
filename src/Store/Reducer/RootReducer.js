import {
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  ADD_PRODUCT,
  GET_PRODUCTS
} from "../Action";

export function RootReducer(state, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      let products = action.payload.content;
      let totalPages = action.payload.totalPages;
      let pageNumber = action.payload.pageNumber;
      return { ...state, products, totalPages, pageNumber };
    }
    case DELETE_PRODUCT: {
    }
    case EDIT_PRODUCT: {
    }
    case ADD_PRODUCT: {
    }
  }

  return state;
}
