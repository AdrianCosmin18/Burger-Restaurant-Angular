import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/burger";
import {BurgerService} from "../../../services/burger.service";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent implements OnInit {
  public burgers: Product[] = [];
  private customerId!: number;

  constructor(private burgerService: BurgerService, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerId = + sessionStorage.getItem("id")!;
    console.log(this.customerId + " din burger component");
    this.burgerService.getBurgers().subscribe(response => {
      this.burgers = response
    })
  }

  addToCart(burger: Product){
    console.log(burger);
    this.customerService.addToCart(this.customerId, burger.id).subscribe(response => {
      alert("Produs adaugat in cos cu succes");
     }, error => {
       alert(error.message);
     })
  }
}
