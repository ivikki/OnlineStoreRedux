import { applyMiddleware, createStore, combineReducers } from "redux";
import { RootReducer } from "../Reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  app: RootReducer,
  form: formReducer
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
