import React from "react";
import ReactDOM from "react-dom";
import { App } from "./Component/App/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { RootReducer } from "./Store/Reducer";
import { initState } from "./Store/InitState";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/main.css";

const store = createStore(
  RootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
