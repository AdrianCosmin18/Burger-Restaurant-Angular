import { Component, OnInit } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  // goToBurgerPage(){
  //   this.router.navigate([""])
  // }

  hasNotRoute(route: string){
    return this.router.url !== route;
  }

  logout(){
    this.auth.logout();
  }
}
