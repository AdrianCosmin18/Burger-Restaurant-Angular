import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Order} from "../interfaces/order";
import {OrderItem} from "../models/order-item";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private path = environment.apiUrl + "order";


  constructor(private http: HttpClient) { }

  getOrderById(id: number): Observable<Order>{
    let url = `${this.path}/${id}`;
    return this.http.get<Order>(url)
      .pipe(catchError(this.handleError));
  }

  getOrderItemsByOrderId(orderId: number): Observable<OrderItem[]>{
    let url = `${this.path}/get-orderItems-by-orderId/${orderId}`;
    return this.http.get<OrderItem[]>(url)
      .pipe(catchError(this.handleError));
  }









  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
      return throwError(error.error.message);
    }
    return throwError('Something bad happened; please try again later.');
  };
}



