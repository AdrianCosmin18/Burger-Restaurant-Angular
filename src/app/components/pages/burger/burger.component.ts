import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../../interfaces/burger";
import {BurgerService} from "../../../services/burger.service";
import firebase from "firebase/compat";
import {AngularFireDatabase} from "@angular/fire/compat/database";

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent implements OnInit {
  public burgers: Product[] = [];

  constructor(private burgerService: BurgerService) { }

  ngOnInit(): void {
    this.burgerService.getBurgers().subscribe(response => {
      this.burgers = response
    })
  }


  addToCart(burger: Product){
    console.log(burger);
  }
}
