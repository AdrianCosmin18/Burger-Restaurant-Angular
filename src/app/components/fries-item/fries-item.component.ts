import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../interfaces/burger";

@Component({
  selector: 'app-fries-item',
  templateUrl: './fries-item.component.html',
  styleUrls: ['./fries-item.component.css']
})
export class FriesItemComponent implements OnInit {
  @Input() fries!: Product;
  @Output() friesEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addCart(){
    this.friesEvent.emit(this.fries);
  }
}
