import { Component, OnInit } from '@angular/core';
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";
import {MessageService} from "primeng/api";
import {OrderItem} from "../../../models/order-item";
import {Constants} from "../../../constants/constants";
import {BurgerService} from "../../../services/burger.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  public items: OrderItem[] = [];
  private customerID!: number;

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    // this.customerID = + sessionStorage.getItem("id")!;
    // this.customerService.getProductsOfCustomer(this.customerID).subscribe(list => {
    //   this.products = list;
    // });

    this.items = JSON.parse(localStorage.getItem(Constants.ITEM_LIST) || "[]");
    console.log(this.items);
  }

  totalAmount(): number{
    let sum = 0;
    for(let p of this.items){
      sum += p.price;
    }
    return Number(sum.toFixed(2));
  }

  removeFromCart(item: OrderItem){
    // console.log(product);
    // this.customerService.deleteFromCart(this.customerID, product.id).subscribe(async response => {
    //   this.customerService.getProductsOfCustomer(this.customerID).subscribe(list => {
    //     this.products = list;
    //   });
    // }, error => {
    //   alert(error.message);
    // })
  }

  // placeOrder(){
  //   this.customerService.placeOrder(this.customerID).subscribe(response => {
  //     this.customerService.getProductsOfCustomer(this.customerID).subscribe(list => {
  //       this.products = list;
  //     });
  //     this.messageService.add({severity: "info", summary: `Comanda a fost plasata cu succes`});
  //   }, error => {
  //     alert(error.message);
  //   })
  // }



}
