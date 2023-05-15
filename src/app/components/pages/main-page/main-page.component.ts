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
  public email!: string | null;

  constructor(private service: CustomerService) { }

  ngOnInit(): void {

    this.loadEmail();

    const itemList: any[] = [];
    localStorage.setItem(Constants.ITEM_LIST, JSON.stringify(itemList));

    const quantity = 0;
    localStorage.setItem(Constants.QUANTITY, String(quantity));
  }

  loadEmail(){
    if(!this.email){
      this.email = localStorage.getItem("email");
    }
  }

}
