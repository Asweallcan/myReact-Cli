import { Action } from "redux";
import {
  ActionsObservable,
  Epic,
  ofType,
  StateObservable,
} from "redux-observable";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { reducerActions } from "../actions/http";

export const pingEpic: Epic<Action<any>, Action<any>, void, any> = (
  action$: ActionsObservable<Action<any>>,
  state$: StateObservable<void>,
  dependencies: any,
): Observable<Action<any>> =>
  action$.pipe(
    ofType(reducerActions.getTest().type),
    mergeMap(() => of({ type: "wocao" })),
  );
