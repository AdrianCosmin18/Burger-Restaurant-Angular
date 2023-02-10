import { Component, OnInit } from '@angular/core';
import {BurgerService} from "../../../services/burger.service";
import {Product} from "../../../interfaces/burger";

@Component({
  selector: 'app-drinks-page',
  templateUrl: './drinks-page.component.html',
  styleUrls: ['./drinks-page.component.css']
})
export class DrinksPageComponent implements OnInit {
  public drinks: Product[] = [];

  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
    this.burgerService.getDrinks().subscribe(response => {
      this.drinks = response;
    });
  }

}
