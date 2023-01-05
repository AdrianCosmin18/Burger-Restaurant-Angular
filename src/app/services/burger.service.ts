import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Burger} from "../interfaces/burger";

@Injectable({
  providedIn: 'root'
})
export class BurgerService {
  private apiUrl = "http://localhost:5000/burgers";

  constructor(private http: HttpClient) { }

  getBurgers(): Observable<Burger[]>{
    return this.http.get<Burger[]>(this.apiUrl);
  }
}
