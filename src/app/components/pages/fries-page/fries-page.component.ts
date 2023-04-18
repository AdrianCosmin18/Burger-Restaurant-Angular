import { Component, OnInit } from '@angular/core';
import {BurgerService} from "../../../services/burger.service";
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-fries-page',
  templateUrl: './fries-page.component.html',
  styleUrls: ['./fries-page.component.css'],
  providers: [MessageService]
})
export class FriesPageComponent implements OnInit {
  public friesList: Product[] = [];
  private customerId!: number;

  constructor(private burgerService: BurgerService, private customerService: CustomerService, private messageService: MessageService) { }

  ngOnInit(): void {
    // this.customerId = + sessionStorage.getItem("id")!;
    // this.burgerService.getFries().subscribe(response => {
    //   this.friesList = response;
    //   console.log(this.friesList);
    // });
  }

  addToCart(fries: Product){
    // console.log(fries);
    // this.customerService.addToCart(this.customerId, fries.id).subscribe(response => {
    //   this.messageService.add({severity: "success", summary: `${fries.name} adugat in cos`, detail: `Mai multe detalii la comanda mea`});
    //
    // }, error => {
    //   alert(error.message);
    // })
  }
}
