import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {Router} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {User} from "../../../interfaces/user";
import {DialogService} from "primeng/dynamicdialog";
import {CartComponent} from "../cart/cart.component";
import {Constants, Roles} from "../../../constants/constants";
import {ConfirmationService, MenuItem, MessageService} from "primeng/api";
import {City} from "../../../interfaces/city";
import {CityService} from "../../../services/city.service";
import {AuthService} from "../../../services/auth.service";
import {PersonalDataComponent} from "./personal-data/personal-data.component";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../redux/app.reducer";
import * as Actions from '../../../redux/auth.actions';
import {AddressComponent} from "./address/address.component";
import {CardPageComponent} from "./card-page/card-page.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class HeaderComponent implements OnInit {
  public customer!: User;
  public cities: City[] = [];
  public citySelected: string = '';
  public email: string | null | undefined = "";
  public name: string = "";
  private role: string = "";
  public count: number = 0;

  public tooltipCount = '';
  public accountButtonLabel: string | null | undefined = 'Contul meu';
  public accountMenuItems!: MenuItem[];
  public showMenu: boolean = false;

  private auth$!: Observable<{ email: string; firstName: string; loggedIn: boolean; role: string }>;
  private authSubscription: Subscription = new Subscription();
  public loggedIn: any;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private confirmService: ConfirmationService,
    private cityService: CityService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {

    this.getInfoUser();
    this.getCities();
    this.countProductsInCart();
  }

  getInfoUser(){
    this.auth$ = this.store.select("auth");
    this.authSubscription = this.auth$.subscribe(value => {
      this.loggedIn = value.loggedIn;
      this.email = value.email;
      this.role = value.role;

      if(this.loggedIn){
        this.accountButtonLabel = value.firstName;
      } else {
        this.accountButtonLabel = 'Contul meu';
      }
      this.initMenuItems()
    });
  }

  initMenuItems(): void{

    if(this.loggedIn){
      this.showMenu = true;
      this.accountMenuItems = [
        {
          label: 'Datele personale',
          icon: 'pi pi-user-edit',
          command: () => this.openPersonalData()
        },
        {
          label: 'Adresele mele',
          icon: 'pi pi-building',
          command: () => this.openAddresses()
        },
        {
          label: 'Cardurile mele',
          icon: 'pi pi-credit-card',
          command: () => this.openCardsPage()
        },
        {
          label: 'Istoric comenzi',
          icon: 'pi pi-replay',
          routerLink: 'historyOrders'
        },
        {
          separator: true
        },
        {
          label: 'Iesire din cont',
          icon: 'pi pi-sign-out',
          command: () => this.logout()
        }
      ];

      if(this.role === Roles.ROLE_ADMIN){
        this.accountMenuItems.push(
          {
            label: 'Pagina admin',
            icon: 'pi pi-verified',
          }
        )
      }
    }

  }

  hasNotRoute(route: string){
    return this.router.url !== route;
  }

  logout(){
    this.authService.logOut();
    this.store.dispatch(new Actions.Logout());
    this.messageService.add({severity:'info', summary: 'Te-ai delogat'});
    this.ngOnInit();
  }

  openCart(): void{

    const ref = this.dialogService.open(CartComponent, {
      header: 'Cosul meu',
      width: '60%',
    });

    // ref.onClose.subscribe((productName: string) => {
    //   if(productName !== null){
    //     this.messageService.add({severity: 'success', summary: `${productName} sters din cos`});
    //   }
    // });
  }

  countProductsInCart(){
    this.count = JSON.parse(localStorage.getItem(Constants.ITEM_LIST) || "[]").length;
  }

  getCities():void{
    this.cityService.getCities().subscribe({
      next:value => {
        this.cities = value;
        console.log(this.cities);
      },
      error:err => {
        alert("Something went wrong");
      }
    })
  }

  openPersonalData(): void{

    const ref = this.dialogService.open(PersonalDataComponent, {
      header: 'Date personale',
      width: '50%'
    })
  }

  openAddresses() {

    const ref = this.dialogService.open(AddressComponent, {
      header: 'Adresele mele',
      width: '60%',
      data: {
        isPlaceOrder: false
      }
    })
  }

  openCardsPage(){
    const ref = this.dialogService.open(CardPageComponent, {
      header: 'Cardurile mele',
      width: '50%',
      data: {
        isPlaceOrder: false
      }
    })
  }
}
