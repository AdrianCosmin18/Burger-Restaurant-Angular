import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../../../services/customer.service";
import {User} from "../../../interfaces/user";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public user!: User;

  constructor(private service: CustomerService) { }

  ngOnInit(): void {

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
