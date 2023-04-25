import {Action} from "@ngrx/store";
import {OrderItem} from "../models/order-item";


export const GET_ITEMS = 'GET ITEMS';
export const ADD_ITEM = 'ADD ITEM';

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

export type ItemListAction = GetItems | AddItems;

