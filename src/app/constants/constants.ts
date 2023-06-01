export enum FoodType{
  BURGER = "burger",
  FRIES = "fries",
  DRINK = "drinks",
  DESERT = "desert",
  EXTRAS_BURGER = "extras-burger",
  EXTRAS_FRIES = "extras-fries",
  EXTRAS_DESERT = "extras-desert",
  EXTRAS_DRINK = "extras-drink",
  SAUCES = "sauces"
}

// daca e cu + sau vazut
export enum ActionIngredientsEnum{
  ADD = "Add ingredient",
  REMOVE = "Remove ingredient"
}

// ne referim pe ce tip de acordeon suntem
export enum ExtraRemoveIngredientMessage{
  EXTRA = "Extra",
  REMOVE = "Remove"
}

export enum Constants{
  ITEM_LIST = 'itemList',
  QUANTITY = 'quantity',
  USER_CREDENTIALS = "userCredentials"
}

export enum Roles{
  ROLE_USER = "ROLE_USER"
}

export enum FormType{
  ADD_FORM_ADDRESS = "Add new address",
  UPDATE_FORM_ADDRESS = "Update address"
}

export enum ErrorMessages{
  USER_ALREADY_OWN_ADDRESS_EXCEPTION = "User already has this address",
  USER_ALREADY_EXISTS_BY_EMAIL_EXCEPTION = "Already exists a user with this email",
  USER_ALREADY_EXISTS_PHONE_EXCEPTION = "This phone number belongs to someone else",
}

export class Constant{
  public static MASTERCARD: string = "Mastercard";
  public static VISA: string = "Visa";
}
