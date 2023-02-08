import {Component, Input, OnInit} from '@angular/core';
import {Drink} from "../../interfaces/drink";

@Component({
  selector: 'app-drinks-item',
  templateUrl: './drinks-item.component.html',
  styleUrls: ['./drinks-item.component.css']
})
export class DrinksItemComponent implements OnInit {
  @Input() drink!: Drink;

  constructor() { }

  ngOnInit(): void {
  }

}
