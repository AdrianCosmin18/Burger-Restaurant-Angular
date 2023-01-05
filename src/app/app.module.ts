import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HeaderComponent } from './components/header/header.component';
import {PrimeIcons} from "primeng/api";
import {ButtonModule} from "primeng/button";
import { BurgerComponent } from './components/burger/burger.component';
import { BurgerItemComponent } from './components/burger-item/burger-item.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    BurgerComponent,
    BurgerItemComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    BurgerItemComponent
  ]
})
export class AppModule { }
