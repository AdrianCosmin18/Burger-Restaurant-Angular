import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../services/customer.service";
import {MessageService} from "primeng/api";
import {User} from "../../../interfaces/user";
import {AuthService} from "../../../services/auth.service";
import {AuthorityModel} from "../../../models/authority-model";
import {Constants, Roles} from "../../../constants/constants";
import * as AuthAction from "../../../redux/auth.actions";
import * as fromApp from "../../../redux/app.reducer";
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;
  private user!: User;
  // public errorMessage!: string;
  public email: string = "";
  public password: string = "";

  private storeSub: Subscription = new Subscription();


  constructor(private service: CustomerService,
              private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  goToRegister(): void{
    this.router.navigate(["/register"]);
  }

  login(){
    // let user: User = {
    //   email: this.myForm.get("email")?.value,
    //   password: this.myForm.get("password")?.value,
    //   phone: '',
    //   firstName: '',
    //   lastName: ''
    // };
    // console.log(user);

    // this.authService.login(user).subscribe({
    //   next: value => {
    //     this.messageService.add({severity: 'success', summary: 'Autentificare realizata cu succes'});
    //
    //     let arrAuth: Array<AuthorityModel> = value.body?.authorities as Array<AuthorityModel>;
    //     let role = '';
    //     if(arrAuth?.some(elem => elem.authority === Roles.ROLE_USER)){
    //       role = Roles.ROLE_USER;
    //     }
    //     this.authService.saveRole(role);
    //     this.authService.saveEmail(value.body!.email);
    //     this.authService.saveToken(value.body!.token);
    //     this.authService.saveFirstName(value.body!.firstName);
    //     this.router.navigate(['/home']);
    //   },
    //   error: err => {
    //     this.messageService.add({severity: "error", summary: `Email sau parola incorecta`});
    //   }
    // })

    const emailForm = this.myForm.get("email")?.value;
    const passwordForm = this.myForm.get("password")?.value;

    this.store.dispatch(new AuthAction.LoginStart({email: emailForm, password: passwordForm}));
    // this.myForm.reset();
  }


}
