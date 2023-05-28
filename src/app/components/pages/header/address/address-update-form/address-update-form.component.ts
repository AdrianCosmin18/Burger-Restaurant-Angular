import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {City} from "../../../../../interfaces/city";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Address} from "../../../../../interfaces/address";
import {CityService} from "../../../../../services/city.service";

@Component({
  selector: 'app-address-update-form',
  templateUrl: './address-update-form.component.html',
  styleUrls: ['./address-update-form.component.css']
})
export class AddressUpdateFormComponent implements OnInit {
  public form!: FormGroup;
  public address!: Address;
  public cities: City[] = [];
  public citySelected: string = '';



  constructor(
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private cityService: CityService
  ) { }

  ngOnInit(): void {

    this.initForm();
  }

  initForm(){
    this.form = this.formBuilder.group({
      cities: ['', [Validators.required]],
      street: ['', [Validators.required, Validators.minLength(4)]],
      number: ['', [Validators.required]],
      block: ['', [Validators.required]],
      staircase: ['', [Validators.required]],
      floor: ['', [Validators.required]],
      apartment: ['', [Validators.required]],
      interphone: ['', [Validators.required]],
      details: [''],
      isDefault: [false]
    });

    this.cityService.subjectCities.subscribe({
      next: value => {
        this.cities = value;
        this.getCurrentAddress();
      }
    })
  }

  getCurrentAddress(){
    this.address = this.config.data.address;
    this.putAddressInForm();
  }

  putAddressInForm(): void{
    this.form.get("cities")?.setValue(this.address.cityName);
    this.citySelected = this.address.cityName
    this.form.patchValue({
      street: this.address.street,
      number: this.address.number,
      block: this.address.block,
      staircase: this.address.staircase,
      floor: this.address.floor,
      apartment: this.address.apartment,
      interphone: this.address.interphone,
      details: this.address.details,
      isDefault: this.address.isDefault
    });
  }

}
