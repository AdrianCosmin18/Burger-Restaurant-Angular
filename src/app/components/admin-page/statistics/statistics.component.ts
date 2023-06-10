import { Component, OnInit } from '@angular/core';
import {OrderItemService} from "../../../services/order-item.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public mapItems = new Map<string, number>();
  public baseData: any;
  public horizontalOptions: any;

  constructor(private orderItemService: OrderItemService) { }

  ngOnInit(): void {

    this.getMapProducts();
  }

  getMapProducts(){
    this.orderItemService.getStatisticsProducts().subscribe({
      next: response => {
        const keys = Object.keys(response);
        for (const key of keys) {
          this.mapItems.set(key, response[key]);
        }
      },
      error: err => {
        alert(err.error.message);
      }
    });
  }

  initData(){

    let labels = this.mapItems.keys();
    let dataSet = [
      {
        label: 'Produse vândute',
        backgroundColor: '#42A5F5',
        data: this.mapItems.values()
      }
    ];

    this.baseData = {
      labels: labels,
      datasets: dataSet
    }
  }

  initOptions() {

    this.horizontalOptions = {
      indexAxis: 'y',
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }

}
