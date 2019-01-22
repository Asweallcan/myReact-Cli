import { AxiosResponse } from "axios";
import { Action } from "redux";

type IPromiseFunc = (params: IHttpRequest) => Promise<void>;

type IActionFunc = (payload?: any) => Action<any>;

export interface IHttpRequest {
  url: string;
  method: string;
  data: object;
}

export interface IHttpResponse {
  status: number;
  statusText: string;
  data: object;
}

export interface IHttpResponseState {
  getTest?: AxiosResponse;
}

export interface IActionsMap {
  getTest?: IPromiseFunc;
}

export interface IReducerActionsMap {
  getTest?: IActionFunc;
}
