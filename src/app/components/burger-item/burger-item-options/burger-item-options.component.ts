import {Component, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/burger";
import {BurgerService} from "../../../services/burger.service";
import {DialogService, DynamicDialogConfig} from "primeng/dynamicdialog";
import {ActionIngredient} from "../../../interfaces/action-ingredient";
import {ActionIngredientsEnum, ExtraRemoveIngredientMessage} from "../../../constants/constants";

@Component({
  selector: 'app-burger-item-options',
  templateUrl: './burger-item-options.component.html',
  styleUrls: ['./burger-item-options.component.css']
})
export class BurgerItemOptionsComponent implements OnInit {
  public burger: Product = {
    name: "",
    price: 0,
    ingredients: "",
    picture: "",
    description: "",
    type: "",
    restaurantName:""
  };
  public extraList: Product[] = [];
  public lessList: Product[] = [];
  public ingredientsDB: Product[] = []; //lsiat tuturor ingredientelor din bd
  public burgerIngredients: Product[] = [];//lista de ingr a burgerului fara carine si chifla la care nu se umbla deobicei
  public burgerIngrCanEliminate: Product[] = [];//lista de ingr care pot fi eliminate care difera de cea de mai sus prin carnea care poate fi eliminata

  public extraIngredientMessage: ExtraRemoveIngredientMessage;
  public removeIngredientMessage: ExtraRemoveIngredientMessage;

  constructor(
    private burgerService: BurgerService,
    private dialogService: DialogService,
    public config: DynamicDialogConfig) {

    this.extraIngredientMessage = ExtraRemoveIngredientMessage.EXTRA;
    this.removeIngredientMessage = ExtraRemoveIngredientMessage.REMOVE;
  }

  ngOnInit(): void {
    this.getAllExtraIngredients();
  }

  getAllExtraIngredients(): void{
    this.burgerService.getExtras().subscribe({
      next: data => {
        this.ingredientsDB = data;
        this.getBurger();
        this.createIngredientsLists();
      }
    });
  }

  getBurger(): void{
    this.burger = this.config.data.burger;
    console.log(this.burger);
  }

  createIngredientsLists(): void{
    const currentBurgerIngredients = this.burger.ingredients.split(",");

    if(!this.checkIfIngredientsBurgerAreInGeneralListOfIngredients(currentBurgerIngredients)){
      alert("Something is wrong with ingredients list");
    }

    this.ingredientsDB.forEach(i => {

      //cream lista de ingrediente a burgerului care pot fi adaugate
      if(currentBurgerIngredients.includes(i.name) && (i.price > 0)){
        this.burgerIngredients.push(i);
      }
      //creem lista de ingr a burg care pot fi eliminate
      if(currentBurgerIngredients.includes(i.name) && (i.price > -1)){
        this.burgerIngrCanEliminate.push(i);
      }
    });
    console.log("lista ingrediente burger curent: ", this.burgerIngredients);
  }

  //functie care verifica daca fiecare ingredient din burger se afla in lista de ingrediente din bd pentru a evita erori
  checkIfIngredientsBurgerAreInGeneralListOfIngredients(burgerIngredients: string[]): boolean{
    const list = this.ingredientsDB.map(product => product.name);

    return burgerIngredients.every(element => {
      return list.includes(element);
    })
  }

  addOrRemoveIngredient(event: any): void{
    const action = event as ActionIngredient;

    switch (action.message) {

      case ExtraRemoveIngredientMessage.EXTRA:{

        switch (action.action){

          case ActionIngredientsEnum.ADD:{
            this.extraList.push(action.ingredient);
            break;
          }

          case ActionIngredientsEnum.REMOVE:{
            //nu se face bine eliminarea nicaieri
            this.extraList.slice(this.extraList.indexOf(action.ingredient), 1);
            break;
          }
        }

        console.log(this.extraList, " extraList");
        break;
      }

      case ExtraRemoveIngredientMessage.REMOVE:{

        switch (action.action){

          case ActionIngredientsEnum.ADD:{
            this.lessList.push(action.ingredient);
            break;
          }

          case ActionIngredientsEnum.REMOVE:{
            this.lessList.slice(this.extraList.indexOf(action.ingredient), 1);
            break;
          }
        }

        console.log(this.lessList, " lessList");
        break;
      }
    }
  }



}
