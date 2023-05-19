import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../interfaces/user";
import {Product} from "../interfaces/burger";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private path = environment.apiUrl + "user";

  constructor(private http: HttpClient) { }


  getCustomerByEmail(email: string): Observable<User>{
    let url = `${this.path}/get-user/${email}`;
    console.log(url);
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError));
  }

  updateCustomerByEmail(email: string, user: User): Observable<void>{
    let url = `${this.path}/update-user/${email}`;
    return this.http.put<void>(url, user)
      .pipe(catchError(this.handleError));
  }

  // getProductsOfCustomer(id: number): Observable<Product[]>{
  //   let url = this.productsOfCustomerUrl + id;
  //   return this.http.get<Product[]>(url);
  // }
  //
  // addToCart(id: number, productId: number): Observable<void>{
  //   let url = this.addToCartUrl + id + "/" + productId;
  //   console.log(url);
  //   return this.http.post<void>(url, {}).pipe(catchError(this.handleError));
  // }
  //
  // deleteFromCart(id: number, productId: number): Observable<void>{
  //   let url = `${this.deleteFromCartUrl}${id}/${productId}`;
  //   console.log(url);
  //   return this.http.delete<void>(url).pipe(catchError(this.handleError));
  // }
  //
  // placeOrder(id: number):Observable<void>{
  //   let url = `${this.placeOrderUrl}${id}`;
  //   return this.http.delete<void>(url).pipe(catchError(this.handleError));
  // }

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
