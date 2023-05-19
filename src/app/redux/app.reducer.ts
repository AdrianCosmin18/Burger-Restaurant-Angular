import * as fromItems from './product.reducer';
import {ActionReducerMap} from "@ngrx/store";
import * as fromAuth from "./auth.reducer";

export interface AppState{

  items: fromItems.State;
  auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
  // @ts-ignore
  items: fromItems.itemsReducer,
  // @ts-ignore
  auth: fromAuth.authReducer
}
