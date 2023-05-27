import {EventEmitter, Injectable} from '@angular/core';
import {UserCredentials} from "../interfaces/user-credentials";
import {Constants} from "../constants/constants";
import {Store} from "@ngrx/store";
import * as fromApp from "../redux/app.reducer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private refreshEvent: EventEmitter<void> = new EventEmitter<void>();
  private auth$!: Observable<{
    email: string;
    firstName: string;
    loggedIn: boolean;
    role: string;
    token: string;
  }>;


  triggerRefresh(){
    this.refreshEvent.emit();
  }

  constructor(private store: Store<fromApp.AppState>) {


    this.storeDataBeforeRefresh();

  }


  //se apeleaza la refresh
  storeDataBeforeRefresh() {

    this.auth$ = this.store.select("auth");
    this.auth$.subscribe(value => {
      let userCredentials: UserCredentials = {
        firstName: value.firstName,
        email: value.email,
        token: value.token,
        loggedIn: value.loggedIn,
        role: value.role
      };

      localStorage.setItem(Constants.USER_CREDENTIALS, JSON.stringify(userCredentials));
    })
  }

  getStoredDataAfterRefresh(): any {

    //lu-am din local storage
    let userCredentials = JSON.parse(localStorage.getItem(Constants.USER_CREDENTIALS) || '');
    console.log(userCredentials);

    //dispatch store
    // this.store.dispatch()

    //erase lcoalstorafe
    // // @ts-ignore
    // return JSON.parse(storedData);

    localStorage.clear();

  }

}
