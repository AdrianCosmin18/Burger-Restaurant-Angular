import { Component, OnInit } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/auth.service";
import {CustomerService} from "../../../services/customer.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  hasNotRoute(route: string){
    return this.router.url !== route;
  }

  logout(){
    sessionStorage.removeItem("id");
    this.router.navigate(["/login"]);
  }
}
