import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../interfaces/customer";
import {Product} from "../interfaces/burger";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private logInUrl = "http://localhost:8080/burger-shop/customer-controller/login";
  private productsOfCustomerUrl = "http://localhost:8080/burger-shop/customer-controller/get-products-of-customer/";
  private addToCartUrl = "http://localhost:8080/burger-shop/customer-controller/add-to-order/";

  constructor(private http: HttpClient) { }

  login(email: string, pass: string): Observable<Customer>{
    let url = this.logInUrl + "?email=" + email + "&password=" + pass;
    return this.http.get<Customer>(url);
  }

  getProductsOfCustomer(id: number): Observable<Product[]>{
    let url = this.productsOfCustomerUrl + id;
    return this.http.get<Product[]>(url);
  }

  addToCart(id: number, productId: number){
    let url = this.addToCartUrl += id + "/" + productId;
    console.log(url);
    this.http.post(url, {});
  }
}
