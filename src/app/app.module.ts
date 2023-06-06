import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { HeaderComponent } from './components/pages/header/header.component';
import {MessageService, PrimeIcons, ConfirmationService} from "primeng/api";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ButtonModule} from "primeng/button";
import { BurgerComponent } from './components/pages/burger/burger.component';
import { BurgerItemComponent } from './components/burger-item/burger-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DesertPageComponent } from './components/pages/desert-page/desert-page.component';
import { DesertItemComponent } from './components/desert-item/desert-item.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FieldsetModule} from "primeng/fieldset";
import {DialogService} from "primeng/dynamicdialog";
import {CardModule} from "primeng/card";
import {BadgeModule} from "primeng/badge";
import {TooltipModule} from "primeng/tooltip";
import { BurgerItemOptionsComponent } from './components/burger-item/burger-item-options/burger-item-options.component';
import {AccordionModule} from "primeng/accordion";
import { IngredientComponent } from './components/burger-item/burger-item-options/ingredient/ingredient.component';
import { FriesItemOptionsComponent } from './components/fries-item/fries-item-options/fries-item-options.component';
import {SelectButtonModule} from "primeng/selectbutton";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {StoreRouterConnectingModule} from "@ngrx/router-store";
import {EffectsModule} from "@ngrx/effects";
import * as fromApp from '../app/redux/app.reducer';
import {RippleModule} from "primeng/ripple";
import { DrinksItemOptionsComponent } from './components/drinks-item/drinks-item-options/drinks-item-options.component';
import { SaucePageComponent } from './components/pages/sauce-page/sauce-page.component';
import { SauceItemComponent } from './components/sauce-item/sauce-item.component';
import {DropdownModule} from "primeng/dropdown";
import {MenuModule} from "primeng/menu";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {DividerModule} from "primeng/divider";
import { SizeDrinkButtonComponent } from './components/drinks-item/drinks-item-options/size-drink-button/size-drink-button.component';
import { PersonalDataComponent } from './components/pages/header/personal-data/personal-data.component';
import {InputTextModule} from "primeng/inputtext";
import {AuthEffects} from "./redux/auth.effects";
import { AddressComponent } from './components/pages/header/address/address.component';
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {OrderListModule} from "primeng/orderlist";
import {PanelModule} from "primeng/panel";
import { AddressItemComponent } from './components/pages/header/address/address-item/address-item.component';
import { AddressUpdateFormComponent } from './components/pages/header/address/address-update-form/address-update-form.component';
import {localStorageSync} from "ngrx-store-localstorage";
import {CheckboxModule} from "primeng/checkbox";
import { CardPageComponent } from './components/pages/header/card-page/card-page.component';
import { CardItemComponent } from './components/pages/header/card-page/card-item/card-item.component';
import { CardFormComponent } from './components/pages/header/card-page/card-form/card-form.component';
import {InputMaskModule} from "primeng/inputmask";
import { PlaceOrderComponent } from './components/pages/place-order/place-order.component';
import {InputTextareaModule} from "primeng/inputtextarea";
import { CustomTipsComponent } from './components/pages/place-order/custom-tips/custom-tips.component';
import { HistoryOrdersComponent } from './components/pages/header/history-oreders/history-orders.component';
import { HistoryOrderItemComponent } from './components/pages/header/history-oreders/history-order-item/history-order-item.component';
import { HistoryOrderItemDetailsComponent } from './components/pages/header/history-oreders/history-order-item/history-order-item-details/history-order-item-details.component';
const appRoutes: Routes = [
  {path: '', redirectTo: "/mainPage", pathMatch: "full"},
  {path: 'login', component: LoginComponent},
  {path: "mainPage", component: MainPageComponent},
  {path: "register", component: RegisterComponent},
  {path: "burgers", component: BurgerComponent},
  {path: "fries", component: FriesPageComponent},
  {path: "drinks", component: DrinksPageComponent},
  {path: "deserts", component: DesertPageComponent},
  {path: "sauces", component: SaucePageComponent},
  {path: "placeOrder", component: PlaceOrderComponent},
  {path: "historyOrders", component: HistoryOrdersComponent},
  {path: "historyOrders/:id", component: HistoryOrderItemDetailsComponent},
  // {path: "**", component: MainPageComponent},

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
    CartItemComponent,
    BurgerItemOptionsComponent,
    IngredientComponent,
    FriesItemOptionsComponent,
    DrinksItemOptionsComponent,
    SaucePageComponent,
    SauceItemComponent,
    SizeDrinkButtonComponent,
    PersonalDataComponent,
    AddressComponent,
    AddressItemComponent,
    AddressUpdateFormComponent,
    CardPageComponent,
    CardItemComponent,
    CardFormComponent,
    PlaceOrderComponent,
    CustomTipsComponent,
    HistoryOrdersComponent,
    HistoryOrderItemComponent,
    HistoryOrderItemDetailsComponent,
  ],
    imports: [
        BrowserModule,
        ButtonModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        ToastModule,
        BrowserAnimationsModule,
        FieldsetModule,
        CardModule,
        BadgeModule,
        StoreModule.forRoot(fromApp.appReducer, {
            metaReducers: [localStorageSyncReducer]
        }),
        TooltipModule,
        FieldsetModule,
        AccordionModule,
        SelectButtonModule,
        StoreDevtoolsModule.instrument({logOnly: environment.production}),
        StoreRouterConnectingModule.forRoot(),
        RippleModule,
        DropdownModule,
        MenuModule,
        OverlayPanelModule,
        DividerModule,
        InputTextModule,
        EffectsModule.forRoot(([AuthEffects])),
        PanelModule,
        OrderListModule,
        CheckboxModule,
        ConfirmDialogModule,
        InputMaskModule,
        InputTextareaModule,
    ],
  providers: [
    DialogService,
    MessageService,
    ConfirmationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [
    BurgerItemComponent,
    FriesItemComponent,
    HeaderComponent,
  ]
})
export class AppModule { }

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['auth', 'settings'], // Specify the state slices to synchronize with local storage
    rehydrate: true,
  })(reducer);
}
