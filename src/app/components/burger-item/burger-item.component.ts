import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Product } from "../../interfaces/burger";
import {Confirmation, ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {BurgerItemOptionsComponent} from "./burger-item-options/burger-item-options.component";

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

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  addToCart(){

    const ref = this.dialogService.open(BurgerItemOptionsComponent, {
      header: this.burger.name,
      width: '40%',
      data: {
        burger: this.burger,
      }
    })

    // this.productInCart++;
    this.burgerEvent.emit(this.burger);
  }

  // eraseFromCart(){
  //   this.productInCart--;
  // }

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
