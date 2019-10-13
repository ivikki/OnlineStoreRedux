import { applyMiddleware, createStore } from "redux";
import { RootReducer } from "../Reducer";
import { initState } from "../InitState";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

export const store = createStore(
  RootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);
