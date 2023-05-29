import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {User} from "../interfaces/user";
import {Product} from "../interfaces/burger";
import {environment} from "../../environments/environment";
import {Address} from "../interfaces/address";
import {City} from "../interfaces/city";


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

  getUserAddresses(email: string): Observable<Array<Address>>{
    let url = `${this.path}/get-user-addresses/${email}`;
    return this.http.get<Array<Address>>(url)
      .pipe(catchError(this.handleError));
  }

  setAddressAsMainAddress(email: string, addressId: number): Observable<void>{
    let url = `${this.path}/set-as-main-address/${email}/${addressId}`;
    return this.http.put<void>(url, null)
      .pipe(catchError(this.handleError));
  }

  addAddress(email: string, addressDTO: Address): Observable<void>{
    let url = `${this.path}/add-address?email=${email}`;
    return this.http.post<void>(url, addressDTO)
      .pipe(catchError(this.handleError));
  }

  updateAddress(email: string, addressId: number, addressDTO: Address): Observable<void>{
    let url = `${this.path}/update-address/${email}/${addressId}`;
    return this.http.put<void>(url, addressDTO)
      .pipe(catchError(this.handleError));
  }

  deleteAddress(email: string, addressId: number): Observable<void>{
    let url = `${this.path}/delete-address/${email}/${addressId}`;
    return this.http.delete<void>(url)
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
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
      return throwError(error.error.message);
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
