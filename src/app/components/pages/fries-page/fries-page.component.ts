import { Component, OnInit } from '@angular/core';
import {BurgerService} from "../../../services/burger.service";
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-fries-page',
  templateUrl: './fries-page.component.html',
  styleUrls: ['./fries-page.component.css']
})
export class FriesPageComponent implements OnInit {
  public friesList: Product[] = [];
  private customerId!: number;

  constructor(private burgerService: BurgerService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerId = + sessionStorage.getItem("id")!;
    this.burgerService.getFries().subscribe(response => {
      this.friesList = response;
      console.log(this.friesList);
    });
  }

  addToCart(fries: Product){
    console.log(fries);
    this.customerService.addToCart(this.customerId, fries.id).subscribe(response => {
      alert("Produs adaugat in cos cu succes");
    }, error => {
      alert(error.message);
    })
  }
}
