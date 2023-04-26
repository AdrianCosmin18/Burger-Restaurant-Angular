import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../interfaces/burger";
import {OrderItem} from "../../models/order-item";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item!: OrderItem;
  @Output() productEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  remove(){
    console.log(this.item);
    this.productEvent.emit(this.item);
  }
}
