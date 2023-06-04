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
import {CustomTipsComponent} from "./custom-tips/custom-tips.component";
import {OrderItem} from "../../../models/order-item";
import {Constants} from "../../../constants/constants";

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

  public classButtonForTips = 'p-button-raised p-button-text';
  public tip2 = '';
  public tip4 = '';
  public tip5 = '';
  public tipCustom = '';

  public items: OrderItem[] = [];




  constructor(
    private messageService: MessageService,
    private store: Store<fromApp.AppState>,
    private userService: CustomerService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getInfo();
    this.initCartList();
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

  clickTipsButton2Lei(){
    this.tip2 = this.classButtonForTips;
    this.tip4 = '';
    this.tip5 = '';
    this.tipCustom = '';
  }

  clickTipsButton4Lei() {
    this.tip2 = '';
    this.tip4 = this.classButtonForTips;
    this.tip5 = '';
    this.tipCustom = '';
  }

  clickTipsButton5Lei() {
    this.tip2 = '';
    this.tip4 = '';
    this.tip5 = this.classButtonForTips;
    this.tipCustom = '';
  }

  clickTipsButtonCustomeTip() {
    const ref = this.dialogService.open(CustomTipsComponent, {
      width: '420px'
    });
    ref.onClose.subscribe((message) => {
      if (message) {
        this.tip2 = '';
        this.tip4 = '';
        this.tip5 = '';
        this.tipCustom = this.classButtonForTips;
      }
    });
  }

  initCartList(){
    this.items = JSON.parse(localStorage.getItem(Constants.ITEM_LIST) || "[]");
    console.log(this.items);
  }

  removeFromCart(productName: string): void {
    this.initCartList()
  }

}
