import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../services/customer.service";
import {Customer} from "../../../interfaces/customer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;
  private customer!: Customer;
  public errorMessage!: string;
  public email: string = "";
  public password: string = "";

  constructor(private service: CustomerService, private router: Router, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  goToRegister(): void{
    this.router.navigate(["/register"]);
  }

  doLogin():void{
    this.service.login(this.email, this.password).subscribe(pers => {
      this.customer = pers;
      sessionStorage.setItem("id", '' + this.customer.id);
      console.log(sessionStorage.getItem("id"));
      this.router.navigate(["/mainPage"]);
    }, error => {

    })

  }
  // login(){
  //   if(this.email == "" || this.password == ""){
  //     alert("Please enter all values");
  //     return;
  //   }
  //
  //   this.auth.login(this.email, this.password);
  //
  //   this.email = "";
  //   this.password = "";
  // }
}
