import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../../services/customer.service";
import {MessageService} from "primeng/api";
import {User} from "../../../interfaces/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  public myForm!: FormGroup;
  private user!: User;
  public errorMessage!: string;
  public email: string = "";
  public password: string = "";

  constructor(private service: CustomerService, private router: Router, private formbuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  goToRegister(): void{
    this.router.navigate(["/register"]);
  }

  // doLogin():void{
  //   this.service.login(this.email, this.password).subscribe(pers => {
  //     this.user = pers;
  //     sessionStorage.setItem("email", '' + this.user.email);
  //     this.router.navigate(["/mainPage"]);
  //   }, error => {
  //     this.messageService.add({severity: "error", summary: `Email sau parola incorecta`});
  //   });
  // }
}
