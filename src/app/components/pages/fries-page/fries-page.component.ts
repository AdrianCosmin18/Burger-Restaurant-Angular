import { Component, OnInit } from '@angular/core';
import {Fries} from "../../../interfaces/fries";
import {BurgerService} from "../../../services/burger.service";
import {Product} from "../../../interfaces/burger";

@Component({
  selector: 'app-fries-page',
  templateUrl: './fries-page.component.html',
  styleUrls: ['./fries-page.component.css']
})
export class FriesPageComponent implements OnInit {
  public friesList: Product[] = [];

  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
    this.burgerService.getFries().subscribe(response => {
      this.friesList = response;
      console.log(this.friesList);
    });
  }

}
