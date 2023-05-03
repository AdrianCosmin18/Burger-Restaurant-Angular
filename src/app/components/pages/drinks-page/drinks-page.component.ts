import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BurgerService} from "../../../services/burger.service";
import {Product} from "../../../interfaces/burger";
import {CustomerService} from "../../../services/customer.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-drinks-page',
  templateUrl: './drinks-page.component.html',
  styleUrls: ['./drinks-page.component.css'],
  providers: [MessageService]
})
export class DrinksPageComponent implements OnInit {
  public allDrinks: Product[] = [];
  public drinkMap: Map<string, Product[]> = new Map<string, Product[]>();
  public drinkArray = [];
  public individualDrinkName: Set<string> = new Set<string>();
  private customerId!: number;

  constructor(
    private burgerService: BurgerService,
    private customerService: CustomerService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    // this.customerId = + sessionStorage.getItem("id")!;
    // console.log(this.customerId + " din drink component");
    // this.burgerService.getDrinks().subscribe(response => {
    //   this.drinks = response;
    // });

    this.burgerService.getDrinks().subscribe({
      next: (response) => {
        this.allDrinks = response;
        this.formDrinkMap();

        for (let [key, value] of this.drinkMap.entries()) {
          // @ts-ignore
          this.drinkArray.push({ key: key, value: value });
        }
      }
    });
  }

  formDrinkMap(){
    this.individualDrinkName = new Set(this.allDrinks.map(drink => drink.name.split(",")[0]));
    this.individualDrinkName.forEach(value => {
      let d = this.allDrinks.filter(drink => drink.name.split(",")[0] === value);
      console.log(d);
      this.drinkMap.set(value, d);
    });
    // console.log(this.individualDrinkName);
    // console.log("driank map: " + this.drinks);
    // this.drinks.forEach((value, key) => {
    //   console.log(`${key}: ${value}\n`);
    // })
  }

  addToCart(){
    // console.log(drink);
    // this.customerService.addToCart(this.customerId, drink.id).subscribe(response => {
    //   this.messageService.add({severity: "success", summary: `${drink.name} adugat in cos`, detail: `Mai multe detalii la comanda mea`});
    // }, error => {
    //   alert(error.message);
    // })
  }
}
