import { Component, OnInit } from '@angular/core';
import {OrderStatus} from "../../../constants/constants";
import {OrderService} from "../../../services/order.service";
import {Order} from "../../../interfaces/order";

@Component({
  selector: 'app-handle-orders',
  templateUrl: './handle-orders.component.html',
  styleUrls: ['./handle-orders.component.css']
})
export class HandleOrdersComponent implements OnInit {
  public placedOrder: string = OrderStatus.COMENZI_PLASATE;
  public cancelOrder: string = OrderStatus.COMENZI_ANULATE;
  public paymentConfirmed: string = OrderStatus.PLATA_CONFIRMATA;
  public orderInPreparation: string = OrderStatus.COMENZI_IN_PREPARARE;
  public orderInDelivery: string = OrderStatus.COMENZI_IN_CURS_DE_LIVRARE;
  public orderDelivered: string = OrderStatus.COMENZI_LIVRATE;

  public orderInPlacedOrderState: Order[] = [];
  public ordersInPaymentConfirmedState: Order[] = [];
  public ordersInPreparationState: Order[] = [];
  public ordersInDeliveryState: Order[] = [];
  public finalizedOrders: Order[] = [];


  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.getOrdersInPlacedOrderState();
    this.getOrdersInPaymentConfState();
    this.getOrdersInPreparationState();
    this.getOrdersInDeliveryState();
    this.getFinalizedOrders();
  }


  getOrdersInPlacedOrderState(){
    this.orderService.getOrdersInPlacedOrderState().subscribe({
      next: value => {
        this.orderInPlacedOrderState = value;
        console.log(value);
      },
      error: err => {
        alert('smth went wrong to get order: ' + err.error.message)
      }
    })
  }

  getOrdersInPaymentConfState(){
    this.orderService.getOrdersInPaymentConfirmedState().subscribe({
      next: value => {
        this.ordersInPaymentConfirmedState = value;
        console.log(value);
      },
      error: err => {
        alert('smth went wrong to get order: ' + err.error.message)
      }
    })
  }

  getOrdersInPreparationState(){
    this.orderService.getOrdersInPreparationState().subscribe({
      next: value => {
        this.ordersInPreparationState = value;
        console.log(value);
      },
      error: err => {
        alert('smth went wrong to get order: ' + err.error.message)
      }
    })
  }

  getOrdersInDeliveryState(){
    this.orderService.getOrdersInDeliveryState().subscribe({
      next: value => {
        this.ordersInDeliveryState = value;
        console.log(value);
      },
      error: err => {
        alert('smth went wrong to get order: ' + err.error.message)
      }
    })
  }

  getFinalizedOrders(){
    this.orderService.getFinalizedOrders().subscribe({
      next: value => {
        this.finalizedOrders = value;
        console.log(value);
      },
      error: err => {
        alert('smth went wrong to get order: ' + err.error.message)
      }
    })
  }

  reloadOrderStates() {
    this.ngOnInit();
  }
}
