import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {Router} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../interfaces/customer";
import {DialogService} from "primeng/dynamicdialog";
import {CartComponent} from "../cart/cart.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public customer!: Customer;
  public email: string = "";
  public name: string = "";

  constructor(
    private router: Router,
    private customerService: CustomerService,
    public dialogService: DialogService,) { }

  ngOnInit(): void {
    // let id = + sessionStorage.getItem("id")!;
    // this.customerService.getCustomerById(id).subscribe(person => {
    //   this.customer = person;
    //   this.name = this.customer.fullName;
    //   this.email = this.customer.email
    //   console.log(id);
    // });

    let id = 1;
    this.customerService.getCustomerById(id).subscribe(person => {
      this.customer = person;
      this.name = this.customer.fullName;
      this.email = this.customer.email
      console.log(id);
    });
  }

  hasNotRoute(route: string){
    return this.router.url !== route;
  }

  logout(){
    sessionStorage.removeItem("id");
    this.router.navigate(["/login"]);
  }

  openCart(): void{

    const ref = this.dialogService.open(CartComponent, {
      header: 'Cosul meu',
      width: '60%',
    })
  }
}
