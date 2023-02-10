import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../interfaces/burger";

@Component({
  selector: 'app-drinks-item',
  templateUrl: './drinks-item.component.html',
  styleUrls: ['./drinks-item.component.css']
})
export class DrinksItemComponent implements OnInit {
  @Input() drink!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
