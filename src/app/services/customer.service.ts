import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../interfaces/customer";
import {Product} from "../interfaces/burger";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private logInUrl = "http://localhost:8080/burger-shop/customer-controller/login";
  private productsOfCustomerUrl = "http://localhost:8080/burger-shop/customer-controller/get-products-of-customer/";
  private addToCartUrl = "http://localhost:8080/burger-shop/customer-controller/add-to-order/";
  private deleteFromCartUrl = "http://localhost:8080/burger-shop/customer-controller/delete-from-cart/";
  private placeOrderUrl = "http://localhost:8080/burger-shop/customer-controller/place-order/";

  constructor(private http: HttpClient) { }

  login(email: string, pass: string): Observable<Customer>{
    let url = this.logInUrl + "?email=" + email + "&password=" + pass;
    return this.http.get<Customer>(url);
  }

  getProductsOfCustomer(id: number): Observable<Product[]>{
    let url = this.productsOfCustomerUrl + id;
    return this.http.get<Product[]>(url);
  }

  addToCart(id: number, productId: number): Observable<void>{
    let url = this.addToCartUrl + id + "/" + productId;
    console.log(url);
    return this.http.post<void>(url, {}).pipe(catchError(this.handleError));
  }

  deleteFromCart(id: number, productId: number): Observable<void>{
    let url = `${this.deleteFromCartUrl}${id}/${productId}`;
    console.log(url);
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  placeOrder(id: number):Observable<void>{
    let url = `${this.placeOrderUrl}${id}`;
    return this.http.delete<void>(url).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  };

  isAuthenticated(): boolean{
    let customerId = sessionStorage.getItem("id");
    if(customerId){
      return true;
    }
    return false;
  }

}
