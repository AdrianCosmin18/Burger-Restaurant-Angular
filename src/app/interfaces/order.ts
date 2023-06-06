export interface Order{
  id: number;
  amount: number;
  status: string;
  deliverTime: string;
  placedOrderTime: string;
  productsAmount: number;
  deliveryTax: number;
  tipsTax: number;
  addressToString: string;
  cardNumber: string;
}
