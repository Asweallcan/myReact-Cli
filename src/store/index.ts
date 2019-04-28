import { applyMiddleware, createStore, Store } from "redux";
import logger from "redux-logger";
import rootReducer from "./reducers";

let store: Store;

store = createStore(rootReducer, applyMiddleware(logger));
export default store;
