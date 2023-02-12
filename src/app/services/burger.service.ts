import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../interfaces/burger";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BurgerService {
  private burgersUrl: string =environment.apiUrl + "burger-shop/products-controller/get-product-by-productType?productType=burger";
  private friesUrl: string = environment.apiUrl +  "burger-shop/products-controller/get-product-by-productType?productType=fries";
  private drinksUrl: string = environment.apiUrl +  "burger-shop/products-controller/get-product-by-productType?productType=drink";
  private desertUrl: string =environment.apiUrl + "burger-shop/products-controller/get-product-by-productType?productType=desert"


  constructor(private http: HttpClient) { }

  getBurgers(): Observable<Product[]>{
    console.log(this.burgersUrl);
    return this.http.get<Product[]>(this.burgersUrl);
  }

  getFries(): Observable<Product[]>{
    return this.http.get<Product[]>(this.friesUrl);
  }

  getDrinks(){
    return this.http.get<Product[]>(this.drinksUrl);
  }

  getDesert(){
    return this.http.get<Product[]>(this.desertUrl);
  }

}
