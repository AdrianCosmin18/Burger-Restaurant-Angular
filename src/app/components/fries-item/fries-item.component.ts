import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../interfaces/burger";
import {DialogService} from "primeng/dynamicdialog";
import {FriesItemOptionsComponent} from "./fries-item-options/fries-item-options.component";

@Component({
  selector: '.fries-item',
  templateUrl: './fries-item.component.html',
  styleUrls: ['./fries-item.component.css']
})
export class FriesItemComponent implements OnInit {
  @Input() fries!: Product;
  @Output() friesEvent = new EventEmitter();

  public loggedIn: boolean = true;
  public isFavorite = false;
  public favoriteColor = 'p-button-secondary p-button-outlined';
  public productInCart: number = 0;
  public favoriteTooltipMessage = 'Adauga la favorite';

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  addToCart(){

    const ref = this.dialogService.open(FriesItemOptionsComponent, {
      header: this.fries.name,
      width: '40%',
      data:{
        fries: this.fries,
      }
    });

    // this.productInCart++;//t
    this.friesEvent.emit(this.fries);
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

  // eraseFromCart(){
  //   this.productInCart--;
  // }
}
