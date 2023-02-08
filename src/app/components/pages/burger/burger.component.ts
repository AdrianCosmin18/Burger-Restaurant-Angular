import {Component, Input, OnInit} from '@angular/core';
import {Burger} from "../../../interfaces/burger";
import {BurgerService} from "../../../services/burger.service";
import {burgers} from "../../../../assets/data/burgers";

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent implements OnInit {
  public burgers: Burger[] = [];

  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
    // this.burgerService.getBurgers().subscribe(response => {
    //   this.burgers = response
    // })
    this.burgers = this.burgerService.getBurgers();
    console.log(this.burgers);
  }

  // getBurgersByType(type: string): Burger[]{
  //   return this.burgers.filter(b => b.type === type);
  // }
}
