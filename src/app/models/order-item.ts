export class OrderItem{

  public price: number;
  public quantity: number;
  public name: string;
  public extraIngredients: string;
  public lessIngredients: string;


  constructor(price: number, quantity: number, name: string, extraIngredients: string, lessIngredients: string) {
    this.price = price;
    this.quantity = quantity;
    this.name = name;
    this.extraIngredients = extraIngredients;
    this.lessIngredients = lessIngredients;
  }
}
