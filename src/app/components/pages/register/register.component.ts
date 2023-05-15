import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../interfaces/user";
import {CustomerService} from "../../../services/customer.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "../../../services/auth.service";
import {AuthorityModel} from "../../../models/authority-model";
import {Roles} from "../../../constants/constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  // public email: string = "";
  // public password: string = "";
  // public fullName: string = "";
  public myForm!: FormGroup;

  constructor(
    private service: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
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

    this.authService.register(user).subscribe({
      next: value => {
        this.messageService.add({severity: 'success', summary: 'Cont creat cu succes'});

        let arrAuth: Array<AuthorityModel> = value.body?.authorities as Array<AuthorityModel>;
        let role = '';
        if(arrAuth?.some(elem => elem.authority === Roles.ROLE_USER)){
          role = Roles.ROLE_USER;
        }
        this.authService.saveRole(role);
        this.authService.saveEmail(value.body!.email);
        this.authService.saveToken(value.body!.token);
        this.router.navigate(['/home']);
      },
      error: err => {
        this.messageService.add({severity: "error", summary: `${err}`});
      }
    })
  }

  // doRegister(){
  //   this.service.register(this.email, this.fullName, this.password).subscribe(async () => {
  //     this.messageService.add({severity: "success", summary: "Inregistrarea realizata cu success"});
  //     await setTimeout(() => {
  //       this.goToLogin();
  //     }, 2000);
  //   }, error => {
  //     this.messageService.add({severity: "error", summary: `Exista deja acest email`});
  //   })
  // }

  goToLogin(){
    this.router.navigate(["/login"]);
  }

}
