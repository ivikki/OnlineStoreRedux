import React from "react";
import ReactDOM from "react-dom";
import { App } from "./Component/App";
import { Provider } from "react-redux";
import { store } from "./Store/Config";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/main.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
