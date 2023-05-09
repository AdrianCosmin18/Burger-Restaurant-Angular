import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {City} from "../interfaces/city";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private path = environment.apiUrl + "city";

  constructor(private http: HttpClient) { }

  getCities(): Observable<City[]>{
    return this.http.get<City[]>(this.path)
      .pipe(catchError(this.handleError));
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
}
