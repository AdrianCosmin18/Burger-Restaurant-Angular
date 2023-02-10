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
import { CartComponent } from './components/pages/cart/cart.component';
import { AngularFireModule } from '@angular/fire/compat'
import {environment} from "../environments/environment";
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import {FormsModule} from "@angular/forms";
import { DesertPageComponent } from './components/pages/desert-page/desert-page.component';
import { DesertItemComponent } from './components/desert-item/desert-item.component';

const appRoutes: Routes = [
  {path: '', redirectTo: "/login", pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: "mainPage", component: MainPageComponent},
  {path: "register", component: RegisterComponent},
  {path: "burgers", component: BurgerComponent},
  {path: "fries", component: FriesPageComponent},
  {path: "drinks", component: DrinksPageComponent},
  {path: "deserts", component: DesertPageComponent},
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
    CartComponent,
    LoginComponent,
    RegisterComponent,
    DesertPageComponent,
    DesertItemComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
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
