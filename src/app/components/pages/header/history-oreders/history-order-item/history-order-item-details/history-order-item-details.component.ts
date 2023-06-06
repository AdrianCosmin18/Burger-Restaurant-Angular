import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../../../../../services/order.service";
import {Order} from "../../../../../../interfaces/order";
import {OrderItem} from "../../../../../../models/order-item";

@Component({
  selector: 'app-history-order-item-details',
  templateUrl: './history-order-item-details.component.html',
  styleUrls: ['./history-order-item-details.component.css']
})
export class HistoryOrderItemDetailsComponent implements OnInit {
  public orderId: number = -1;
  public order!: Order;
  public orderItems: OrderItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getIdFromRoute();
  }

  getIdFromRoute(){
    this.route.params.subscribe({
      next: url => {
        let id = url['id'];
        this.orderId = parseInt(id);
        this.getOrder();
      }
    })
  }

  getOrder(){
    this.orderService.getOrderById(this.orderId).subscribe({
      next: value => {
        this.order = value;
        this.getOrderItemsOfOrder();
        console.log(this.order);
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  getOrderItemsOfOrder(){
    this.orderService.getOrderItemsByOrderId(this.orderId).subscribe({
      next: value => {
        this.orderItems = value;
        this.getTotalQuantity();
        console.log(this.orderItems);
      },
      error: err => {
        alert(err.error.message);
      }
    })
  }

  getTotalQuantity(): number{
    let nr = 0;
    this.orderItems.forEach(oi => {
      nr += oi.quantity;
    });
    return nr;
  }
}
