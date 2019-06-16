import * as React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { Loading } from "./components";

const Main = Loadable({
  loading: Loading,
  loader: () => import("./pages/main")
});

export default () => (
  <Router>
    <Switch>
      <Route exact path="/test" component={Main} />
    </Switch>
  </Router>
);
