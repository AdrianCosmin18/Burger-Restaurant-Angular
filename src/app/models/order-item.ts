export class OrderItem{

  public price: number;
  public quantity: number;
  public extraIngredients: string;
  public lessIngredients: string;


  constructor(price: number, quantity: number, extraIngredients: string, lessIngredients: string) {
    this.price = price;
    this.quantity = quantity;
    this.extraIngredients = extraIngredients;
    this.lessIngredients = lessIngredients;
  }
}
