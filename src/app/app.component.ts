import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromApp from "./redux/app.reducer";
import {Observable} from "rxjs";
import {UserCredentials} from "./interfaces/user-credentials";
import {Constants} from "./constants/constants";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {LoadData} from "./redux/auth.actions";
import * as Actions from "./redux/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proiect';


}
