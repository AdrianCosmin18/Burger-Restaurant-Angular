import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../interfaces/burger";

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() product!: Product;
  @Output() productEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  remove(){
    console.log(this.product);
    this.productEvent.emit(this.product);
  }
}
