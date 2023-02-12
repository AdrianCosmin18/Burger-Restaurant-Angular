import { Component, OnInit } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {Router} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../interfaces/customer";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public customer!: Customer;
  public email: string = "";
  public name: string = "";

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    let id = + sessionStorage.getItem("id")!;
    this.customerService.getCustomerById(id).subscribe(person => {
      this.customer = person;
      this.name = this.customer.fullName;
      this.email = this.customer.email
      console.log(id);
    }, error => alert(error.message));
  }

  hasNotRoute(route: string){
    return this.router.url !== route;
  }

  logout(){
    sessionStorage.removeItem("id");
    this.router.navigate(["/login"]);
  }
}
