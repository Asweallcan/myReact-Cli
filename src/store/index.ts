import { applyMiddleware, compose, createStore, Store } from "redux";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "./epics";
import rootReducer from "./reducers";

const epicMiddleware = createEpicMiddleware();
const reduxDevToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
let store: Store;

if (!reduxDevToolsExtension) {
  store = createStore(rootReducer, applyMiddleware(epicMiddleware, logger));
} else {
  store = createStore(
    rootReducer,
    compose(
      applyMiddleware(epicMiddleware, logger),
      reduxDevToolsExtension && reduxDevToolsExtension(),
    ),
  );
}

epicMiddleware.run(rootEpic);

export default store;
