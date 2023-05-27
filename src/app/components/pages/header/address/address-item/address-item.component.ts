import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from "../../../../../interfaces/address";
import {AddressUpdateFormComponent} from "../address-update-form/address-update-form.component";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: '.address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css']
})
export class AddressItemComponent implements OnInit {
  @Input() address!: Address;
  @Output() emitMainAddressId = new EventEmitter<number>();

  public favoriteColor = 'p-button-secondary p-button-outlined';
  public tooltipMessage = '';
  // public isFavorite = false;

  constructor(
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
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
    console.log(this.address);
  }

  openUpdateAddressForm(): void{

    const ref = this.dialogService.open(AddressUpdateFormComponent, {
      header: 'Modifica adresa',
      width: '60%',
      data: {
        address: this.address
      }
    })
  }
}
