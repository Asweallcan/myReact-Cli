import { AnyAction } from "redux";
import { handleActions } from "redux-actions";
import { httpResponse } from "../actions";
import { IReducerActionsMap } from "../models";
import { IStoreState } from "../models/store";

let actionsMap: IReducerActionsMap = {};
Object.keys(httpResponse).forEach((key: string) => {
  actionsMap = Object.assign({}, actionsMap, {
    [key.toUpperCase()]: (state: IStoreState, action: AnyAction) => ({
      [key]: action.payload,
    }),
  });
});

export default handleActions(actionsMap, {});
