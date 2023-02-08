import {Component, Input, OnInit} from '@angular/core';
import {Burger} from "../../interfaces/burger";
import {Fries} from "../../interfaces/fries";

@Component({
  selector: 'app-burger-item',
  templateUrl: './burger-item.component.html',
  styleUrls: ['./burger-item.component.css']
})
export class BurgerItemComponent implements OnInit {
  @Input() burger!: Burger;

  constructor() { }

  ngOnInit(): void {
  }

}
