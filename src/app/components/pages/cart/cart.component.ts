import { Component, OnInit } from '@angular/core';
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: Product[] = [];
  private customerID!: number;

  constructor(private customerService: CustomerService) { }

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

}
