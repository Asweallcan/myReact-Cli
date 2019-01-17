import { combineEpics } from "redux-observable";
import { pingEpic } from "./test";

export default combineEpics(pingEpic);
