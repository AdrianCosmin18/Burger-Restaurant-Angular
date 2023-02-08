import { Component, OnInit } from '@angular/core';
import {Drink} from "../../../interfaces/drink";
import {BurgerService} from "../../../services/burger.service";

@Component({
  selector: 'app-drinks-page',
  templateUrl: './drinks-page.component.html',
  styleUrls: ['./drinks-page.component.css']
})
export class DrinksPageComponent implements OnInit {
  public drinks: Drink[] = [];

  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
    this.drinks = this.burgerService.getDrinks();
  }

}
