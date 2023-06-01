import {ExpiryDate} from "./ExpiryDate";

export interface Card{
  id?: number;
  cardType: string,
  cardNumber: string,
  cardHolderName: string,
  securityCode: number,
  expiryDate: string,
  fullExpiryDate: ExpiryDate,
  isDefault: boolean;
}
