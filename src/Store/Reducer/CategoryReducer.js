import { GET_CATEGORIES_SUCCESS, ADD_CATEGORY_ERROR } from "../Action";

const initState = {
  categories: [],
  errors: []
};

export function CategoryReducer(state = initState, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload };
    case ADD_CATEGORY_ERROR:
      return { ...state, errors: action.payload };
  }

  return state;
}
