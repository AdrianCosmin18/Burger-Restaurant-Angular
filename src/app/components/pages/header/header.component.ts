import { Component, OnInit } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // goToBurgerPage(){
  //   this.router.navigate([""])
  // }
}
