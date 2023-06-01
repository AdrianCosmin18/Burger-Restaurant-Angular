import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../../../../interfaces/card";
import {Constant} from "../../../../../constants/constants";
import {cleanPackageJson} from "@angular/compiler-cli/ngcc/src/packages/build_marker";

@Component({
  selector: '.app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
  @Input() card!: Card;
  @Output() emitMainCardId = new EventEmitter<number>();
  public src = "";
  public expiry = "";
  public textColor = '';
  public tooltipMessage = '';

  constructor() { }

  ngOnInit(): void {

    this.getCardType();
    if(this.card.isDefault){
      this.textColor = '';
      this.tooltipMessage = "Card principal";
    }else{
      this.textColor = 'p-button-outlined'
    }
    console.log(this.card.fullExpiryDate);
  }

  getCardType(){
    if(this.card.cardType === Constant.MASTERCARD){
      this.src = './assets/Cards/mastercard.png';
    }else if (this.card.cardType === Constant.VISA){
      this.src = './assets/Cards/visa.png';
    }

    console.log(typeof this.card.expiryDate);
    this.expiry = `${this.card.fullExpiryDate.day}.${this.card.fullExpiryDate.month}.${this.card.fullExpiryDate.year}`;
  }

  makeMainCard(){
    if(!this.card.isDefault){
      this.emitMainCardId.emit(this.card.id);
    }
  }
}
