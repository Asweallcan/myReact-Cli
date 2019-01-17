import axios, { AxiosResponse } from "axios";
import { createAction } from "redux-actions";
import store from "../index";
import {
  IActionsMap,
  IHttpRequest,
  IHttpResponse,
  IReducerActionsMap,
} from "../model";

// 用来直接进行http请求的函数map
const actionsMap: IActionsMap = {};
// 用来生成httpResponse的actions
const reducerActions: IReducerActionsMap = {};
// 生成httpfailaction
const failActions: IReducerActionsMap = {};

const registHttpAction: (actionName: string) => void = (actionName: string) => {
  failActions[actionName] = createAction(`${actionName}Fail`.toUpperCase());
  reducerActions[actionName] = createAction(
    actionName.toUpperCase(),
    (payload: IHttpResponse) => payload,
  );
  actionsMap[actionName] = async (params: IHttpRequest): Promise<void> => {
    try {
      const response: AxiosResponse = await axios(params);
      delete response.headers;
      delete response.request;
      delete response.config;
      store.dispatch(reducerActions[actionName](response));
    } catch (err) {
      store.dispatch(failActions[actionName]());
    }
  };
};

["getTest"].forEach((actionName: string) => registHttpAction(actionName));

export { actionsMap, reducerActions, failActions };
