import {OrderItem} from "../models/order-item";
import * as Actions from './product.action';

export interface State{
  itemList: OrderItem[];
}

const initialState: State = {
  itemList: []
}

export function itemsReducer(
  state: State = initialState,
  action: Actions.ItemListAction
){
  switch (action.type){
    case Actions.ADD_ITEM:
      return{
        ...state,
        itemList: [...state.itemList, action.item],
        info:'add item'
      }

    case Actions.GET_ITEMS:
      return{
        ...state,
        itemList: action.items,
        info: 'get items'
      }

    default:
      return state;
  }
}
