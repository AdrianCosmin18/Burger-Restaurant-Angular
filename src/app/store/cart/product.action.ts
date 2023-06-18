import {Action} from "@ngrx/store";
import {OrderItem} from "../../models/order-item";


export const GET_ITEMS = 'GET ITEMS';
export const ADD_ITEM = 'ADD ITEM';
export const EDIT_ITEM = 'EDIT ITEM';
export const REMOVE_ITEM = "REMOVE ITEM";

export class GetItems implements Action{

  readonly type = GET_ITEMS;
  constructor(public items: OrderItem[]) {
  }
}

export class AddItems implements Action{

  readonly type = ADD_ITEM;
  constructor(public item: OrderItem) {
  }
}

export class EditItem implements Action{

  readonly type = EDIT_ITEM;
}

export class RemoveItem implements Action{
  readonly type = REMOVE_ITEM;

}

export type ItemListAction = GetItems | AddItems | EditItem;

