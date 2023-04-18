import { Component, OnInit } from '@angular/core';
import {BurgerService} from "../../../services/burger.service";
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-desert-page',
  templateUrl: './desert-page.component.html',
  styleUrls: ['./desert-page.component.css'],
  providers: [MessageService]
})
export class DesertPageComponent implements OnInit {
  public deserts: Product[] = [];
  private customerId!: number;

  constructor(private burgerService: BurgerService, private customerService: CustomerService, private messageService: MessageService) { }

  ngOnInit(): void {
    // this.customerId = + sessionStorage.getItem("id")!;
    // console.log(this.customerId + " din desert component");
    // this.burgerService.getDesert().subscribe(resp => {
    //   this.deserts = resp;
    // })
  }


  addToCart(desert: Product){
    // console.log(desert);
    // this.customerService.addToCart(this.customerId, desert.id).subscribe(response => {
    //   this.messageService.add({severity: "success", summary: `${desert.name} adugat in cos`, detail: `Mai multe detalii la comanda mea`});
    //
    // }, error => {
    //   alert(error.message);
    // })
  }
}
