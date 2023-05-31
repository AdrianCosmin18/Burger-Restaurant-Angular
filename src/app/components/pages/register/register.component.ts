import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user";
import {CustomerService} from "../../../services/customer.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth.service";
import {AuthorityModel} from "../../../models/authority-model";
import {Roles} from "../../../constants/constants";
import {Store} from "@ngrx/store";
import * as fromApp from "../../../redux/app.reducer";
import * as AuthAction from "../../../redux/auth.actions";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit, OnDestroy {
  // public email: string = "";
  // public password: string = "";
  // public fullName: string = "";
  public myForm!: FormGroup;
  private auth$!: Observable<{ loggedIn: boolean }>;
  private subscriptions: Subscription= new Subscription();


  constructor(
    private service: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      firstName: ["", Validators.required, Validators.minLength(2)],
      lastName: ["", Validators.required, Validators.minLength(2)],
      phone: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  doRegister(): void{
    let user: User = this.myForm.value;
    console.log(user);

    this.store.dispatch(new AuthAction.RegisterStart(user));
    this.auth$ = this.store.select("auth");
    this.subscriptions = this.auth$.subscribe(value => {
      if(value.loggedIn){
        this.myForm.reset();
        this.router.navigate(['/home']);
        localStorage.removeItem("auth");
      }
    });
  }


  goToLogin(){
    this.router.navigate(["/login"]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
