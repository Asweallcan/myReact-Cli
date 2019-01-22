import { applyMiddleware, createStore, Store } from "redux";
import logger from "redux-logger";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "./epics";
import rootReducer from "./reducers";

const epicMiddleware = createEpicMiddleware();
let store: Store;

store = createStore(rootReducer, applyMiddleware(epicMiddleware, logger));

epicMiddleware.run(rootEpic);

export default store;
