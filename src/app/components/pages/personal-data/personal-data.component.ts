import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "../../../interfaces/user";
import {CustomerService} from "../../../services/customer.service";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {
  public user!: User;

  public firstNameInput: string = '';
  public lastNameInput: string = '';
  public emailInput: string = '';
  public phoneInput: string = '';

  constructor(
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private userService: CustomerService
  ) { }

  ngOnInit(): void {

    this.getCurrentUser();
  }

  getCurrentUser(){

    const email = localStorage.getItem("email");
    this.userService.getCustomerByEmail(email!).subscribe({
      next: value => {
        this.user = value;
        this.emailInput = this.user.email;
        this.firstNameInput = this.user.firstName;
        this.lastNameInput = this.user.lastName;
        this.phoneInput = this.user.phone;
        console.log(this.user);
      }
    })
  }

}
