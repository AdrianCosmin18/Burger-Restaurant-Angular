import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../redux/app.reducer";
import {Address} from "../../../interfaces/address";
import {CustomerService} from "../../../services/customer.service";
import {AddressComponent} from "../header/address/address.component";
import {DialogService} from "primeng/dynamicdialog";
import {Card} from "../../../interfaces/card";
import {CardPageComponent} from "../header/card-page/card-page.component";

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  private auth$!: Observable<{ email: string; }>;
  private authSubscription: Subscription = new Subscription();
  private email: string = '';
  public hasMainAddress!: boolean;
  public hasSelectedAddress!: boolean;
  public address!: Address;
  public hasMainCard!: boolean;
  public hasSelectedCard!: boolean;

  public card!: Card;

  public toStringAddress: string = '';
  public toStringCard: string = '';

  public noAddressMessage: string = 'Va rugam sa selectati o adresa';
  public noCardMessage: string = 'Va rugam sa selectati un card';


  constructor(
    private messageService: MessageService,
    private store: Store<fromApp.AppState>,
    private userService: CustomerService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(){
    this.auth$ = this.store.select("auth");
    this.authSubscription = this.auth$.subscribe(value => {
      this.email = value.email;
      this.hasAnyMainAddress();
      this.hasAnyMainCard();
    })
  }

  hasAnyMainAddress(){
    this.userService.hasUserMainAddress(this.email).subscribe({
      next: value => {
        if(value){
          this.hasMainAddress = true;
          this.getUserMainAddress();
        }else{
          this.hasMainAddress = false;
        }
        this.hasSelectedAddress = this.hasMainAddress;
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  getUserMainAddress(){
    this.userService.getUserMainAddress(this.email).subscribe({
      next: value => {
        if(value){
          this.address = value;
          this.initToStringAddress();
        }
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  hasAnyMainCard(){
    this.userService.hasUserMainCard(this.email).subscribe({
      next: value => {
        if(value){
          this.hasMainCard = true;
          this.getUserMainCard();
        }else{
          this.hasMainCard = false;
        }
        this.hasSelectedCard = this.hasMainCard;
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  getUserMainCard(){
    this.userService.getUserMainCard(this.email).subscribe({
      next: value => {
        if(value){
          this.card = value;
          this.initToStringCard();
        }
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  initToStringAddress(){
    this.toStringAddress =  this.address.cityName + ", " + this.address.street + ", "+ this.address.number;
  }

  initToStringCard(){
    this.toStringCard = this.card.cardNumber + " - " + this.card.cardType;
  }

  selectAddress() {
    const ref = this.dialogService.open(AddressComponent, {
      header: 'Adresele mele',
      width: '60%',
      data: {
        isPlaceOrder: true
      }
    });

    ref.onClose.subscribe((addr: Address) => {
      if(addr){
        this.address = addr;
        this.hasSelectedAddress = true;
        this.initToStringAddress();
      }
    })
  }

  selectCard(){
    const ref = this.dialogService.open(CardPageComponent, {
      header: 'Cardurile mele',
      width: '50%',
      data: {
        isPlaceOrder: true
      }
    });

    ref.onClose.subscribe((crd: Card) => {
      if(crd){
        this.card = crd;
        this.hasSelectedCard = true;
        this.initToStringCard();
      }
    })
  }

}
