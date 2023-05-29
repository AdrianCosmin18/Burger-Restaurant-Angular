import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from "../../../../../interfaces/address";
import {AddressUpdateFormComponent} from "../address-update-form/address-update-form.component";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormType} from "../../../../../constants/constants";
import {ConfirmationService} from "primeng/api";
import {CustomerService} from "../../../../../services/customer.service";

@Component({
  selector: '.address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css'],
  providers: [ConfirmationService]
})
export class AddressItemComponent implements OnInit {
  @Input() address!: Address;
  @Input() email!: string;
  @Output() emitMainAddressId = new EventEmitter<any>();
  @Output() emitUpdateAddress = new EventEmitter<any>();
  @Output() emitDeleteAddress = new EventEmitter<any>();

  public favoriteColor = 'p-button-secondary p-button-outlined';
  public tooltipMessage = '';
  // public isFavorite = false;

  constructor(
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private confirmationService: ConfirmationService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    if(this.address.isDefault){
      this.favoriteColor = 'p-button-danger';
      this.tooltipMessage = "adresa principala";

    }else{
      this.favoriteColor = 'p-button-secondary p-button-outlined';
    }
  }

  makeMainAddress(){
    if(!this.address.isDefault){
      this.emitMainAddressId.emit(this.address.id);
    }
    // this.isFavorite = !this.isFavorite;
    // this.favoriteColor = this.isMainAddress ? 'p-button-danger' : 'p-button-secondary p-button-outlined';
  }

  deleteAddress() {
    this.confirmationService.confirm({
      message: 'Sunteti sigur ca doriti sa stergeti aceasta adresa?',
      header: 'Sterge adresa',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Da',
      rejectLabel: 'Nu',
      accept: () => {
        this.customerService.deleteAddress(this.email, this.address.id).subscribe({
          next: () => {
            const summary = 'Adresa a fost stearsa cu succes';
            const detail = this.address.street;
            this.emitDeleteAddress.emit({summary, detail});
          },
          error: err => {
            alert(err);
          }
        })
      }
    })
  }


  openUpdateAddressForm(): void{

    const ref = this.dialogService.open(AddressUpdateFormComponent, {
      header: 'Modifica adresa',
      width: '60%',
      data: {
        formType: FormType.UPDATE_FORM_ADDRESS,
        address: this.address
      }
    });

    ref.onClose.subscribe((message) => {
        this.emitUpdateAddress.emit(message);
    });

  }
}
