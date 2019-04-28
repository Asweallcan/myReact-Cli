import * as React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { Loading } from "./components";

const Test = Loadable({
  loading: Loading,
  loader: () => import("./pages/Test"),
});

export default () => (
  <Router>
    <Switch>
      <Route exact path="/test" component={Test} />
    </Switch>
  </Router>
);
