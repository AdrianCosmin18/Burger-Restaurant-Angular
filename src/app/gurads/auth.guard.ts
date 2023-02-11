import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {CustomerService} from "../services/customer.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private customerService: CustomerService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      let isAuth = this.customerService.isAuthenticated();
      if(isAuth){
        return true;
      }else{
        this.router.navigate(["/login"]);
        return false;
      }
    }

}
