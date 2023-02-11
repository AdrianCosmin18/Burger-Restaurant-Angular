import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../interfaces/burger";

@Component({
  selector: 'app-drinks-item',
  templateUrl: './drinks-item.component.html',
  styleUrls: ['./drinks-item.component.css']
})
export class DrinksItemComponent implements OnInit {
  @Input() drink!: Product;
  @Output() drinkEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  addCart(){
    this.drinkEvent.emit(this.drink);
  }
}
