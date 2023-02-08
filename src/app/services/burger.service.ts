import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Burger} from "../interfaces/burger";
import { retry, catchError } from 'rxjs/operators';
import {burgers} from "../../assets/data/burgers";
import {friseList} from "../../assets/data/friseData";
import {drinksList} from "../../assets/data/drinks";

@Injectable({
  providedIn: 'root'
})
export class BurgerService {
  // private apiUrl: string = "../assets/data/burgers.json";

  constructor(private http: HttpClient) { }
  //
  // getBurgers(): Observable<Burger[]>{
  //   return this.http.get<Burger[]>(this.apiUrl);
  // }

  getBurgers(){
    return burgers;
  }

  getFries(){
    return friseList;
  }

  getDrinks(){
    return drinksList;
  }

}
