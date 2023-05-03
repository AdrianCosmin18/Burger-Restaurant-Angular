import { Component, OnInit } from '@angular/core';
import {Product} from "../../../interfaces/burger";
import {BurgerService} from "../../../services/burger.service";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-drinks-item-options',
  templateUrl: './drinks-item-options.component.html',
  styleUrls: ['./drinks-item-options.component.css']
})
export class DrinksItemOptionsComponent implements OnInit {
  public drinkList: Product[] = [];

  public drinkCounter = 1;
  public piMinusColor = 'grey';
  public piMinusCursor = 'not-allowed';
  public drinkPrice = -1;

  constructor(
    private burgerService: BurgerService,
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {

    this.getDrinks();
  }

  getDrinks(): void{
    this.drinkList = this.config.data.drink;
    console.log(this.drinkList);
  }

}
