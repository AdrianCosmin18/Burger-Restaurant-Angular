import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../interfaces/burger";
import {OrderItem} from "../../models/order-item";
import {BurgerService} from "../../services/burger.service";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item!: OrderItem;
  @Output() productEvent = new EventEmitter();

  public extraIngr: string[] = [];
  public extraPrice: number = 0;
  public product!: Product;

  constructor(
    private burgerService: BurgerService
  ) { }

  ngOnInit(): void {
    this.getProductByName();
    this.getExtraIngr();
  }

  remove(){
    console.log(this.item);
    this.productEvent.emit(this.item);
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
}
