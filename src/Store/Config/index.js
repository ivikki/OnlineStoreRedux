import { applyMiddleware, createStore, combineReducers } from "redux";
import { RootReducer, CategoryReducer } from "../Reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { rootSaga } from "../../Component/saga";

const rootReducer = combineReducers({
  app: RootReducer,
  category: CategoryReducer,
  form: formReducer
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
