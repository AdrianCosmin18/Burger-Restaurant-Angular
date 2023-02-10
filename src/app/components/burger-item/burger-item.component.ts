import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product} from "../../interfaces/burger";

@Component({
  selector: 'app-burger-item',
  templateUrl: './burger-item.component.html',
  styleUrls: ['./burger-item.component.css']
})
export class BurgerItemComponent implements OnInit {
  @Input() burger!: Product;
  @Output() burgerEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.burger.src);
  }

  addToCart(){
    this.burgerEvent.emit(this.burger);
  }
}
