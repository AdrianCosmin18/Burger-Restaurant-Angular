import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AuthenticationResponse} from "../models/authentication-response";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl + 'user';
  private token: string | null | undefined;
  private email: string | null | undefined;
  private firstName: string | null | undefined;

  private auth!: AuthenticationResponse;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<HttpResponse<AuthenticationResponse>>{
    const path = `${this.url}/register`;

    return this.http.post<AuthenticationResponse>(path, user, {observe: 'response'})
      .pipe(catchError(this.handleError));
  }

  login(user: User): Observable<HttpResponse<AuthenticationResponse>>{
    const path = `${this.url}/login`;
    return this.http.post<AuthenticationResponse>(path, user, {observe: 'response'})
      .pipe(catchError(this.handleError));
  }


  saveAuth(auth: AuthenticationResponse){
    localStorage.setItem("token", auth.token);
    localStorage.setItem("email", auth.email);
    localStorage.setItem("firstName", auth.firstName);
  }

  loadEmail(): void{
    this.email = localStorage.getItem("email");
  }

  getEmail(){
    return this.email;
  }

  loadToken(): void{
    this.token = localStorage.getItem("jwtToken");
  }

  getToken(){
    return this.token;
  }

  loadFirstName(){
    this.firstName = localStorage.getItem("firstName");
  }

  getFirstName(){
    return this.firstName;
  }

  logOut(): void{
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");
  }


  private handleError(error: HttpErrorResponse): Observable<never>{
    console.log(error);
    let errorMessage:string;

    errorMessage = error.error.message;
    return throwError(errorMessage);
  }
}
