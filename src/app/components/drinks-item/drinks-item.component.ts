import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../interfaces/burger";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService} from "primeng/api";
import {BurgerItemOptionsComponent} from "../burger-item/burger-item-options/burger-item-options.component";
import {DrinksItemOptionsComponent} from "./drinks-item-options/drinks-item-options.component";

@Component({
  selector: '.drink-item',
  templateUrl: './drinks-item.component.html',
  styleUrls: ['./drinks-item.component.css'],
  providers: [MessageService]
})
export class DrinksItemComponent implements OnInit {
  @Input() drink!: {key: string, value: Product[]};
  @Output() drinkEvent = new EventEmitter();
  public descriptionDrink = '';

  public loggedIn: boolean = true;
  public isFavorite = false;
  public favoriteColor = 'p-button-secondary p-button-outlined';
  public favoriteTooltipMessage = 'Adauga la favorite';

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.putDrinkDescription();
  }

  addCart(){
    const ref = this.dialogService.open(DrinksItemOptionsComponent, {
      header: this.drink.key,
      width: '40%',
      data: {
        drink: this.drink.value,
      }
    });

    ref.onClose.subscribe((productInfo: any) => {
      if(productInfo.productName != null){
        this.messageService.add({severity: 'success', summary: `${productInfo.productQuantity} x ${productInfo.productName} adaugat in cos`});
      }
    });

    this.drinkEvent.emit(this.drink);
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

  putDrinkDescription(){
    const description = this.drink.value[0].description;//descrierea unui produs
    const firstComma = description.indexOf(",");
    this.descriptionDrink = description.substring(firstComma + 1);
  }
}
