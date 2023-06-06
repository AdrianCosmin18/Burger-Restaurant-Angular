import {Component, Input, OnInit} from '@angular/core';
import {Order} from "../../../../../interfaces/order";
import {Router} from "@angular/router";


@Component({
  selector: '.history-order-item',
  templateUrl: './history-order-item.component.html',
  styleUrls: ['./history-order-item.component.css']
})
export class HistoryOrderItemComponent implements OnInit {
  @Input() order!: Order;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  checkOrder() {
    this.router.navigate([`historyOrders/${this.order.id}`]);
  }
}
