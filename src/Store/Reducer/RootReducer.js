import {
  SHOW_MESSAGE,
  CLEAR_MESSAGE_ERROR,
  GET_PRODUCTS,
  SHOW_ERROR,
  USER_LOGIN,
  CLEAR_USER,
  APP_INIT
} from "../Action";

const initState = {
  appIsInit: false,
  user: null,
  products: [],
  size: 3,
  pageNumber: 0,
  totalPages: 0,
  error: null,
  message: null
};

export function RootReducer(state = initState, action) {
  switch (action.type) {
    case GET_PRODUCTS: {
      let products = action.payload.content;
      let totalPages = action.payload.totalPages;
      let pageNumber = action.payload.pageNumber;
      return { ...state, products, totalPages, pageNumber };
    }

    case CLEAR_USER:
      return { ...state, user: null };

    case USER_LOGIN:
      return { ...state, user: action.payload };

    case SHOW_MESSAGE:
      return { ...state, message: action.payload };

    case CLEAR_MESSAGE_ERROR:
      return { ...state, message: null, error: null };

    case SHOW_ERROR:
      return { ...state, error: action.payload };

    case APP_INIT:
      return { ...state, appIsInit: true };
  }

  return state;
}
