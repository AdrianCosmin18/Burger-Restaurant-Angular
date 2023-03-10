import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product } from "../../interfaces/burger";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-burger-item',
  templateUrl: './burger-item.component.html',
  styleUrls: ['./burger-item.component.css'],
})
export class BurgerItemComponent implements OnInit {
  @Input() burger!: Product;
  @Output() burgerEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addToCart(){
    this.burgerEvent.emit(this.burger);
  }

}
