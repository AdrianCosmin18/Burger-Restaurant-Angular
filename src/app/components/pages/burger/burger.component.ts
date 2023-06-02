import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/burger";
import {BurgerService} from "../../../services/burger.service";
import {CustomerService} from "../../../services/customer.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css'],
  providers: [MessageService]
})
export class BurgerComponent implements OnInit {
  public burgers: Product[] = [];

  constructor(private burgerService: BurgerService, private customerService: CustomerService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.burgerService.getBurgers().subscribe({
      next: (response) => {
        this.burgers = response;
        console.log(this.burgers);
      }
    });
  }

  addToCart(burger: Product){
    // console.log(burger);
    // this.customerService.addToCart(this.customerId, burger.id).subscribe(response => {
    //   this.messageService.add({severity: "success", summary: `${burger.name} adugat in cos`, detail: `Mai multe detalii la comanda mea`});
    //  }, error => {
    //    alert(error.message);
    //  })
  }
}
