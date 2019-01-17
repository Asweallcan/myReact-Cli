import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
// 国际化必须引入 这行不能去掉
import i18n from "./i18next";
import Test from "./pages/test";

ReactDOM.render(
  <Provider store={store}>
    <Test />
  </Provider>,
  document.getElementById("app")
);
