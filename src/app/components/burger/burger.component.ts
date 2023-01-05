import {Component, Input, OnInit} from '@angular/core';
import {Burger} from "../../interfaces/burger";
import {BurgerService} from "../../services/burger.service";

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent implements OnInit {
  burgers: Burger[] = [];

  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
    this.burgerService.getBurgers().subscribe(burgers => {
      this.burgers = burgers;
    })
  }


}
