import * as fromItems from './product.reducer';
import {ActionReducerMap} from "@ngrx/store";

export interface AppState{

  items: fromItems.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  // @ts-ignore
  items: fromItems.itemsReducer
}
