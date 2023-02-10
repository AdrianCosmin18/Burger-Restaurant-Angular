import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../interfaces/burger";

@Component({
  selector: 'app-fries-item',
  templateUrl: './fries-item.component.html',
  styleUrls: ['./fries-item.component.css']
})
export class FriesItemComponent implements OnInit {
  @Input() fries!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
