import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {User} from "../../../interfaces/user";
import {Constants} from "../../../constants/constants";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public user!: User;

  constructor(private service: CustomerService) { }

  ngOnInit(): void {

    const itemList: any[] = [''];
    localStorage.setItem(Constants.ITEM_LIST, JSON.stringify(itemList));

    const quantity = 0;
    localStorage.setItem(Constants.QUANTITY, String(quantity));

    let email = "cosmin@yahoo.com";
    this.service.getCustomerByEmail(email).subscribe({
      next: (user) => {
        this.user = user as User;
        localStorage.setItem('email', email);
        console.log(this.user);
        console.log(localStorage.getItem('email'));
      }
    });


  }

}
