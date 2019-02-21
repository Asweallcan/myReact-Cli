import { Action } from "redux";

declare const Methods: ["get", "post", "put", "delete"];
type Method = (typeof Methods)[number];

export interface IHttpRequest<T = {}> {
  url: string;
  method: Method;
  data?: T;
  params?: T;
}

export interface IHttpResponse<T = {}> {
  status: number;
  statusText: string;
  data: T;
}

type IPromiseFunc<T = {}> = (params: IHttpRequest<T>) => Promise<void>;

type IActionFunc = (payload?: IHttpResponse) => Action<any>;

export interface IActionsMap {
  getTest?: IPromiseFunc;
}

export interface IReducerActionsMap {
  getTest?: IActionFunc;
}

export interface IHttpResponseState {
  getTest?: IHttpResponse;
}
