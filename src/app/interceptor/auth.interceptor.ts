import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private service: AuthService) {}

  // se plaseaza intre request si server si intercepteaza astfel
  intercept(request: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes(`${environment.apiUrl}/user/register`)){
      // nu punem niciun token pentru ca nu este un url la care e nevoie de autoritate
      return handler.handle(request);
    }

    if(request.url.includes(`${environment.apiUrl}/user/login`)){
      // nu punem niciun token pentru ca nu este un url la care e nevoie de autoritate
      return handler.handle(request);
    }

    // altfel luam tokenul
    this.service.loadToken();
    const token = this.service.getToken();
    const httpRequest = request.clone({ // clonam requestul si punem token-ul
      setHeaders:{Authorization: `Bearer ${token}`}
    });
    return handler.handle(httpRequest);// il trimitem mai departe catre server
  }
}
