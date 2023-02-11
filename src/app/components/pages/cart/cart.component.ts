import { Component, OnInit } from '@angular/core';
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService]
})
export class CartComponent implements OnInit {
  public products: Product[] = [];
  private customerID!: number;

  constructor(private customerService: CustomerService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.customerID = + sessionStorage.getItem("id")!;
    this.customerService.getProductsOfCustomer(this.customerID).subscribe(list => {
      this.products = list;
    });
  }

  totalAmount(): number{
    let sum = 0;
    for(let p of this.products){
      sum += p.price;
    }
    return sum;
  }

  removeFromCart(product: Product){
    console.log(product);
    this.customerService.deleteFromCart(this.customerID, product.id).subscribe(async response => {
      this.customerService.getProductsOfCustomer(this.customerID).subscribe(list => {
        this.products = list;
      });
    }, error => {
      alert(error.message);
    })
  }

  placeOrder(){
    this.customerService.placeOrder(this.customerID).subscribe(response => {
      this.customerService.getProductsOfCustomer(this.customerID).subscribe(list => {
        this.products = list;
      });
      this.messageService.add({severity: "info", summary: `Comanda a fost plasata cu succes`});
    }, error => {
      alert(error.message);
    })
  }

}
