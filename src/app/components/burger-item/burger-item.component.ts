import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product } from "../../interfaces/burger";
import {MessageService} from "primeng/api";

@Component({
  selector: '.burger-item',
  templateUrl: './burger-item.component.html',
  styleUrls: ['./burger-item.component.css'],
})
export class BurgerItemComponent implements OnInit {
  @Input() burger!: Product;
  @Output() burgerEvent = new EventEmitter();

  public loggedIn: boolean = true;
  public isFavorite = false;
  public favoriteColor = 'p-button-secondary p-button-outlined';
  public productInCart: number = 0;
  public favoriteTooltipMessage = 'Adauga la favorite';

  constructor() { }

  ngOnInit(): void {
  }

  addToCart(){
    this.productInCart++;
    this.burgerEvent.emit(this.burger);
  }

  eraseFromCart(){
    this.productInCart--;
  }

  addToFavorites() {
    this.isFavorite = !this.isFavorite;
    this.favoriteColor = this.isFavorite ? 'p-button-danger' : 'p-button-secondary p-button-outlined';
    if (this.isFavorite) {
      // Adaugă produsul la lista de favorite
      this.favoriteTooltipMessage = 'Sterge de la favorite';
    } else {
      // Elimină produsul din lista de favorite
      this.favoriteTooltipMessage = 'Adauga la favorite';
    }
  }
}
