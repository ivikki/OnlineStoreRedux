import { SHOW_MESSAGE, CLEAR_STORE, GET_PRODUCTS, SHOW_ERROR } from "../Action";

export function RootReducer(state, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      let products = action.payload.content;
      let totalPages = action.payload.totalPages;
      let pageNumber = action.payload.pageNumber;
      return { ...state, products, totalPages, pageNumber };
    }
    case SHOW_MESSAGE:
      return { ...state, message: action.payload };

    case CLEAR_STORE:
      return { ...state, message: null, error: null };

    case SHOW_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
