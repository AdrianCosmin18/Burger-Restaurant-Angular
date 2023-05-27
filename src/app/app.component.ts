import {Component, OnInit} from '@angular/core';
import {RefreshService} from "./services/refresh.service";
import {Store} from "@ngrx/store";
import * as fromApp from "./redux/app.reducer";
import {Observable} from "rxjs";
import {UserCredentials} from "./interfaces/user-credentials";
import {Constants} from "./constants/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'proiect';


  ngOnInit() {


   this.refreshService.getStoredDataAfterRefresh();
  }


  constructor(private refreshService: RefreshService) {}

  private triggerRefresh(){
    this.refreshService.triggerRefresh();
  }

  private refresh() {
    console.log('se reincarca componenta...');
  }
}
