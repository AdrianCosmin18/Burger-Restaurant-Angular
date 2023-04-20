import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../interfaces/burger";
import {environment} from "../../environments/environment";
import {FoodType} from "../constants/constants";

@Injectable({
  providedIn: 'root'
})
export class BurgerService {
  private burgersUrl: string = environment.apiUrl + `restaurant/get-restaurant-products/BurgerShop?type=${FoodType.BURGER}`;
  private friesUrl: string = environment.apiUrl + "restaurant/get-restaurant-products/BurgerShop?type=fries";
  private extrasUrl: string = environment.apiUrl + `restaurant/get-restaurant-products/BurgerShop?type=${FoodType.EXTRAS}`;
  // private drinksUrl: string = environment.apiUrl +  "burger-shop/products-controller/get-product-by-productType?productType=drink";
  // private desertUrl: string =environment.apiUrl + "burger-shop/products-controller/get-product-by-productType?productType=extras"


  constructor(private http: HttpClient) { }

  getBurgers(): Observable<Product[]>{
    console.log(this.burgersUrl);
    return this.http.get<Product[]>(this.burgersUrl);
  }

  getFries(): Observable<Product[]>{
    return this.http.get<Product[]>(this.friesUrl);
  }

  getExtras(): Observable<Product[]>{
    return this.http.get<Product[]>(this.extrasUrl);
  }
  //
  // getDrinks(){
  //   return this.http.get<Product[]>(this.drinksUrl);
  // }
  //
  // getDesert(){
  //   return this.http.get<Product[]>(this.desertUrl);
  // }

  private getPictureUrl(picture: any): string {
    const base64String = btoa(
      new Uint8Array(picture)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    return `data:image/png;base64, ${base64String}`;
  }

}
