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

  public loggedIn: boolean = true;
  public isFavorited = false;
  public favoriteColor = '';

  constructor() { }

  ngOnInit(): void {
  }

  addToCart(){
    this.burgerEvent.emit(this.burger);
  }

  addToFavorites() {
    this.isFavorited = !this.isFavorited;
    this.favoriteColor = this.isFavorited ? 'p-button-danger' : '';
    if (this.isFavorited) {
      // Adaugă produsul la lista de favorite
    } else {
      // Elimină produsul din lista de favorite
    }
  }
}
