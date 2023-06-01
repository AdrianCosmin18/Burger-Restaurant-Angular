import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../interfaces/burger";
import {OrderItem} from "../../models/order-item";
import {BurgerService} from "../../services/burger.service";
import {Constants} from "../../constants/constants";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item: OrderItem = new OrderItem(-1,-1,'','','');
  @Output() productEvent = new EventEmitter<string>();

  public extraIngr: string[] = [];
  public extraPrice: number = 0;
  public product: Product = {
    name: '',
    price: -1,
    type: '',
    description: '',
    ingredients: '',
    image: [],
    restaurantName: ''
  };

  constructor(
    private burgerService: BurgerService
  ) { }

  ngOnInit(): void {
    this.getProductByName();
    this.getExtraIngr();
  }


  getExtraIngr(){
    const list = this.item.extraIngredients.split(",");
    list.forEach(ingrName => {
      this.extraIngr.push(ingrName);
    });
    console.log("getExtraIngr " + this.product.name + " :" + this.extraIngr);
  }

  getProductByName(){
    this.burgerService.getProductByName(this.item.name).subscribe({
      next: data => {
        this.product = data;
        this.extraPrice = Number((this.item.price - this.product.price).toFixed(2));
      }
    });
  }

  removeFromCart(){
    let itemsList = JSON.parse(localStorage.getItem(Constants.ITEM_LIST) || "[]");
    const initialSize = itemsList.length;
    let hasRemovedItem = false;
    itemsList = itemsList.filter((item: OrderItem) => {
      if(this.equals(this.item, item) && !hasRemovedItem){
        hasRemovedItem = true;
        return false;
      }else{
        return true;
      }
    });
    localStorage.setItem(Constants.ITEM_LIST, JSON.stringify(itemsList));
    if(initialSize > itemsList.length){
      this.productEvent.emit('Produs sters');
    }
  }

  decreaseQuantity(){
    let changed = false;
    if(this.item.quantity === 1){
      this.removeFromCart();
    }else{
      let itemsList = JSON.parse(localStorage.getItem(Constants.ITEM_LIST) || "[]");
      itemsList = itemsList.map((item: OrderItem) => {
        if(this.equals(item, this.item) && !changed){
          changed = true;
          return { ...item, quantity: item.quantity - 1 };
        } else{
          return item;
        }
      });
      localStorage.setItem(Constants.ITEM_LIST, JSON.stringify(itemsList));
      if(changed){
        this.productEvent.emit("Cantitate produs modificata");
      }
    }
  }

  increaseQuantity(){
    let changed = false;
    let itemsList = JSON.parse(localStorage.getItem(Constants.ITEM_LIST) || "[]");
    itemsList = itemsList.map((item: OrderItem) => {
      if(this.equals(item, this.item) && !changed){
        changed = true;
        return { ...item, quantity: item.quantity + 1 };
      } else{
        return item;
      }
    });
    localStorage.setItem(Constants.ITEM_LIST, JSON.stringify(itemsList));
    if(changed){
      this.productEvent.emit("Cantitate produs modificata");
    }
  }

  orderItemTotalPrice(): number{
    return Number((this.item.price * this.item.quantity).toFixed(2));
  }

  equals(i1: OrderItem, i2: OrderItem): boolean{
    return i1.price === i2.price &&
      i1.quantity === i2.quantity &&
      i1.name === i2.name &&
      i1.extraIngredients === i2.extraIngredients &&
      i1.lessIngredients === i2.lessIngredients;

  }
}
