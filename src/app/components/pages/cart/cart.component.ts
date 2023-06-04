import { Component, OnInit } from '@angular/core';
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";
import {MessageService} from "primeng/api";
import {OrderItem} from "../../../models/order-item";
import {Constants} from "../../../constants/constants";
import {BurgerService} from "../../../services/burger.service";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../redux/app.reducer";
import * as AuthAction from "../../../redux/auth.actions";
import {Route, Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service";
import {AppState} from "../../../redux/app.reducer";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  public items: OrderItem[] = [];
  private auth$!: Observable<{ email: string, loggedIn: boolean }>;
  private itemList$!: Observable<{ it: OrderItem[]}>;
  private storeSub: Subscription = new Subscription();



  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    private store: Store<fromApp.AppState>,
    private router: Router,
    private notificationService : NotificationService
  ) { }

  ngOnInit(): void {

    this.initCartList();
  }

  initCartList(){
    this.items = JSON.parse(localStorage.getItem(Constants.ITEM_LIST) || "[]");
    console.log(this.items);
  }

  totalAmount(): number{
    let sum = 0;
    for(let p of this.items){
      sum += Number((p.price * p.quantity).toFixed(2));
    }
    return Number(sum.toFixed(2));
  }

  removeFromCart(productName: string): void{
    this.initCartList();

  }

  placeOrder(){

    this.auth$ = this.store.select("auth");
    this.storeSub = this.auth$.subscribe(value => {
      if(value.loggedIn){
        this.router.navigate(['/placeOrder']);
        this.ref.close();
      }else{
        this.notificationService.onInfo('needToBeAuth','Trebuie sa fi conectat pentru a putea plasa o comanda', '');
        this.ref.close();
        this.router.navigate(['/login']);
      }
    })
  }



}
