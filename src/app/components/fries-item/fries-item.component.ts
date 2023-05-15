import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../interfaces/burger";
import {DialogService} from "primeng/dynamicdialog";
import {FriesItemOptionsComponent} from "./fries-item-options/fries-item-options.component";
import {MessageService} from "primeng/api";

@Component({
  selector: '.fries-item',
  templateUrl: './fries-item.component.html',
  styleUrls: ['./fries-item.component.css'],
  providers: [MessageService]
})
export class FriesItemComponent implements OnInit {
  @Input() fries!: Product;
  @Output() friesEvent = new EventEmitter();

  public loggedIn: boolean = true;
  public isFavorite = false;
  public favoriteColor = 'p-button-secondary p-button-outlined';
  public productInCart: number = 0;
  public favoriteTooltipMessage = 'Adauga la favorite';

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addToCart(){

    const ref = this.dialogService.open(FriesItemOptionsComponent, {
      header: this.fries.name,
      width: '40%',
      data:{
        fries: this.fries
      }
    });

    ref.onClose.subscribe((productInfo: any) => {
      if(productInfo !== undefined && productInfo.productName !== null){
        this.messageService.add({severity: 'success', summary: `${productInfo.productQuantity} x ${productInfo.productName} adaugat in cos`});
      }
    });

    // ref.onClose.subscribe((productInfo: any) => {
    //   if(productInfo.productName !== null) {
    //     this.messageService.add({severity: 'success', summary: `${productInfo.productQuantity} x ${productInfo.productName} adaugat in cos`});
    //   }
    // });

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
