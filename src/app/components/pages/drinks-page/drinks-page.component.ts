import { Component, OnInit } from '@angular/core';
import {BurgerService} from "../../../services/burger.service";
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-drinks-page',
  templateUrl: './drinks-page.component.html',
  styleUrls: ['./drinks-page.component.css'],
  providers: [MessageService]
})
export class DrinksPageComponent implements OnInit {
  public drinks: Product[] = [];
  private customerId!: number;

  constructor(private burgerService: BurgerService, private customerService: CustomerService, private messageService: MessageService) { }

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
      this.messageService.add({severity: "success", summary: `${drink.name} adugat in cos`, detail: `Mai multe detalii la comanda mea`});
    }, error => {
      alert(error.message);
    })
  }
}
