import { Component, OnInit } from '@angular/core';
import {BurgerService} from "../../../services/burger.service";
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-desert-page',
  templateUrl: './desert-page.component.html',
  styleUrls: ['./desert-page.component.css']
})
export class DesertPageComponent implements OnInit {
  public deserts: Product[] = [];
  private customerId!: number;

  constructor(private burgerService: BurgerService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerId = + sessionStorage.getItem("id")!;
    console.log(this.customerId + " din desert component");
    this.burgerService.getDesert().subscribe(resp => {
      this.deserts = resp;
    })
  }


  addToCart(desert: Product){
    console.log(desert);
    this.customerService.addToCart(this.customerId, desert.id).subscribe(response => {
      alert("Produs adaugat in cos cu succes");
    }, error => {
      alert(error.message);
    })
  }
}
