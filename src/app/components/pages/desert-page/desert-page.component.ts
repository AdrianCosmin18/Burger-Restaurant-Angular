import { Component, OnInit } from '@angular/core';
import {BurgerService} from "../../../services/burger.service";
import {Product} from "../../../interfaces/burger";

@Component({
  selector: 'app-desert-page',
  templateUrl: './desert-page.component.html',
  styleUrls: ['./desert-page.component.css']
})
export class DesertPageComponent implements OnInit {
  public deserts: Product[] = [];

  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
    this.burgerService.getDesert().subscribe(resp => {
      this.deserts = resp;
    })
  }

}
