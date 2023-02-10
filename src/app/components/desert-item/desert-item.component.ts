import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../interfaces/burger";

@Component({
  selector: 'app-desert-item',
  templateUrl: './desert-item.component.html',
  styleUrls: ['./desert-item.component.css']
})
export class DesertItemComponent implements OnInit {
  @Input() desert!: Product;

  constructor() { }

  ngOnInit(): void {
  }

}
