import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../interfaces/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private logInUrl = "http://localhost:8080/burger-shop/customer-controller/login";

  constructor(private http: HttpClient) { }

  login(email: string, pass: string): Observable<Customer>{
    let url = this.logInUrl + "?email=" + email + "&password=" + pass;
    return this.http.get<Customer>(url);
  }

  logout(){


  }
}
