import axios, { AxiosResponse } from "axios";
import { createAction } from "redux-actions";
import { message } from "antd";
import store from "../index";
import { IActionsMap, IReducerActionsMap, IHttpRequest, IHttpResponse } from "../models";

// 用来直接进行http请求的函数map
const actionsMap: IActionsMap = {};
// 用来生成httpResponse的actions
const reducerActions: IReducerActionsMap = {};

const registHttpAction: (actionName: string) => void = (actionName: string) => {
  reducerActions[actionName] = createAction(actionName.toUpperCase(), (payload: IHttpResponse) => payload);
  actionsMap[actionName] = async (params: IHttpRequest): Promise<void> => {
    try {
      const response: AxiosResponse = await axios(params);
      store.dispatch(reducerActions[actionName](response.data));
      return Promise.resolve();
    } catch (err) {
      message.error(`${actionName} http请求发送错误，请联系管理员`);
      return Promise.reject();
    }
  };
};

["getTest"].forEach((actionName: string) => registHttpAction(actionName));

export { actionsMap, reducerActions };
