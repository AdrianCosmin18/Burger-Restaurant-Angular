import {Component, Input, OnInit} from '@angular/core';
import {Fries} from "../../interfaces/fries";

@Component({
  selector: 'app-fries-item',
  templateUrl: './fries-item.component.html',
  styleUrls: ['./fries-item.component.css']
})
export class FriesItemComponent implements OnInit {
  @Input() fries!: Fries;

  constructor() { }

  ngOnInit(): void {
  }

}
