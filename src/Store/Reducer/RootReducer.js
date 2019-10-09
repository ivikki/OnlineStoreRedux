import {
  SHOW_MESSAGE,
  CLEAR_MESSAGE,
  GET_PRODUCTS,
  CLEAR_ERROR,
  SHOW_ERROR
} from "../Action";

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

    case CLEAR_MESSAGE:
      return { ...state, message: null };

    case SHOW_ERROR:
      return { ...state, error: action.payload };

    case CLEAR_ERROR:
      return { ...state, error: null };
  }

  return state;
}
