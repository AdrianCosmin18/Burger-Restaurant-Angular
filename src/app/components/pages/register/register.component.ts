import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../../interfaces/customer";
import {CustomerService} from "../../../services/customer.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  public email: string = "";
  public password: string = "";
  public fullName: string = "";
  public myForm!: FormGroup;

  constructor(private service: CustomerService, private router: Router, private formbuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.myForm = this.formbuilder.group({
      email: ["", [Validators.required]],
      fullName: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  doRegister(){
    this.service.register(this.email, this.fullName, this.password).subscribe(async () => {
      this.messageService.add({severity: "success", summary: "Inregistrarea realizata cu success"});
      await setTimeout(() => {
        this.goToLogin();
      }, 2000);
    }, error => {
      this.messageService.add({severity: "error", summary: `Exista deja acest email`});
    })
  }

  goToLogin(){
    this.router.navigate(["/login"]);
  }

}
