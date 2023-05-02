import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {Router} from "@angular/router";
import {CustomerService} from "../../../services/customer.service";
import {User} from "../../../interfaces/user";
import {DialogService} from "primeng/dynamicdialog";
import {CartComponent} from "../cart/cart.component";
import {Constants} from "../../../constants/constants";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [MessageService]
})
export class HeaderComponent implements OnInit {
  public customer!: User;
  public email: string = "";
  public name: string = "";
  public count: number = 0;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    public dialogService: DialogService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    // let id = + sessionStorage.getItem("id")!;
    // this.customerService.getCustomerById(id).subscribe(person => {
    //   this.customer = person;
    //   this.name = this.customer.fullName;
    //   this.email = this.customer.email
    //   console.log(id);
    // });

    // let email = 'cosmin@yahoo.com';
    // this.customerService.getCustomerById(id).subscribe(person => {
    //   // this.customer = person;
    //   // this.name = this.customer.fullName;
    //   // this.email = this.customer.email
    //   // console.log(id);
    // });
    this.countProductsInCart();
  }

  hasNotRoute(route: string){
    return this.router.url !== route;
  }

  logout(){
    sessionStorage.removeItem("id");
    this.router.navigate(["/login"]);
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
}
