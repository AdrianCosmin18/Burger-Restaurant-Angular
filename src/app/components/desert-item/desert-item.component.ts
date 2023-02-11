import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../interfaces/burger";

@Component({
  selector: 'app-desert-item',
  templateUrl: './desert-item.component.html',
  styleUrls: ['./desert-item.component.css']
})
export class DesertItemComponent implements OnInit {
  @Input() desert!: Product;
  @Output() desertEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addCart(){
    this.desertEvent.emit(this.desert);
  }
}
