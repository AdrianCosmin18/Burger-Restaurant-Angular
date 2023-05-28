import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {User} from "../../../../interfaces/user";
import {CustomerService} from "../../../../services/customer.service";
import {user} from "@angular/fire/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Constants} from "../../../../constants/constants";
import {MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../../redux/app.reducer";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
  providers: [MessageService]
})
export class PersonalDataComponent implements OnInit {
  public user!: User;
  public form!: FormGroup;
  private auth$!: Observable<{ email: string; firstName: string; loggedIn: boolean }>;

  constructor(
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private userService: CustomerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getCurrentUser();
  }

  getCurrentUser(){

    this.auth$ = this.store.select("auth");
    this.auth$.subscribe(value => {
      const email = value.email;

      this.userService.getCustomerByEmail(email).subscribe({
        next: value => {
          this.user = value;
          this.putUserInForm();
        }
      })
    })
  }

  initForm(){
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('07\\d{8}')]],
    });
  }

  putUserInForm(){
    this.form.setValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone
    })
  }

  updateUser(){
    const email = localStorage.getItem("email");

    let user: User = {
      firstName: this.form.get("firstName")?.value,
      lastName: this.form.get("lastName")?.value,
      email: this.form.get("email")?.value,
      phone: this.form.get("phone")?.value,
      password: ''
    }

    // @ts-ignore
    this.userService.updateCustomerByEmail(email, user).subscribe({
      next: () => {
        this.messageService.add({severity:'success', summary:'Datele au fost salvate'});
        this.ngOnInit();
      }
    })
  }

}
