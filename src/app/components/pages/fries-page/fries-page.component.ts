import { Component, OnInit } from '@angular/core';
import {Fries} from "../../../interfaces/fries";
import {BurgerService} from "../../../services/burger.service";

@Component({
  selector: 'app-fries-page',
  templateUrl: './fries-page.component.html',
  styleUrls: ['./fries-page.component.css']
})
export class FriesPageComponent implements OnInit {
  public friesList: Fries[] = [];

  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
    this.friesList = this.burgerService.getFries();
  }

}
