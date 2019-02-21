import axios, { AxiosResponse } from "axios";
import { createAction } from "redux-actions";
import store from "../index";
import { IActionsMap, IReducerActionsMap, IHttpRequest, IHttpResponse } from "../models";

// 用来直接进行http请求的函数map
const actionsMap: IActionsMap = {};
// 用来生成httpResponse的actions
const reducerActions: IReducerActionsMap = {};
// 生成http fail action
const failActions: IReducerActionsMap = {};

const registHttpAction: (actionName: string) => void = (actionName: string) => {
  failActions[actionName] = createAction(`${actionName}Fail`.toUpperCase());
  reducerActions[actionName] = createAction(actionName.toUpperCase(), (payload: IHttpResponse) => payload);
  actionsMap[actionName] = async (params: IHttpRequest): Promise<void> => {
    try {
      const response: AxiosResponse = await axios(params);
      store.dispatch(reducerActions[actionName](response.data));
      return Promise.resolve();
    } catch (err) {
      store.dispatch(failActions[actionName]());
      return Promise.reject();
    }
  };
};

["getTest"].forEach((actionName: string) => registHttpAction(actionName));

export { actionsMap, reducerActions, failActions };
