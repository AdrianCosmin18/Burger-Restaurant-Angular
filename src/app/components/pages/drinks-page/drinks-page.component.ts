import { Component, OnInit } from '@angular/core';
import {BurgerService} from "../../../services/burger.service";
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-drinks-page',
  templateUrl: './drinks-page.component.html',
  styleUrls: ['./drinks-page.component.css']
})
export class DrinksPageComponent implements OnInit {
  public drinks: Product[] = [];
  private customerId!: number;

  constructor(private burgerService: BurgerService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerId = + sessionStorage.getItem("id")!;
    console.log(this.customerId + " din drink component");
    this.burgerService.getDrinks().subscribe(response => {
      this.drinks = response;
    });
  }

  addToCart(drink: Product){
    console.log(drink);
    this.customerService.addToCart(this.customerId, drink.id).subscribe(response => {
      alert("Produs adaugat in cos cu succes");
    }, error => {
      alert(error.message);
    })
  }
}
