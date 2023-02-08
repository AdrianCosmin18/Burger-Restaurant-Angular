import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { HeaderComponent } from './components/pages/header/header.component';
import {PrimeIcons} from "primeng/api";
import {ButtonModule} from "primeng/button";
import { BurgerComponent } from './components/pages/burger/burger.component';
import { BurgerItemComponent } from './components/burger-item/burger-item.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import { FooterComponent } from './components/pages/footer/footer.component';
import { FriesPageComponent } from './components/pages/fries-page/fries-page.component';
import { FriesItemComponent } from './components/fries-item/fries-item.component';
import { DrinksItemComponent } from './components/drinks-item/drinks-item.component';
import { DrinksPageComponent } from './components/pages/drinks-page/drinks-page.component';

const appRoutes: Routes = [
  {path: '', redirectTo: "/mainPage", pathMatch: "full"},
  {path: "mainPage", component: MainPageComponent},
  {path: "burgers", component: BurgerComponent},
  {path: "fries", component: FriesPageComponent},
  {path: "drinks", component: DrinksPageComponent},
  {path: "**", component: MainPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    BurgerComponent,
    BurgerItemComponent,
    FooterComponent,
    FriesPageComponent,
    FriesItemComponent,
    DrinksItemComponent,
    DrinksPageComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    BurgerItemComponent,
    FriesItemComponent,
    HeaderComponent,
  ]
})
export class AppModule { }
