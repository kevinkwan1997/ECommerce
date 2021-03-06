import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/item';
import { FakeStoreApiService } from 'src/app/services/fake-store-api.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-shopping-page',
  templateUrl: './shopping-page.component.html',
  styleUrls: ['./shopping-page.component.scss']
})
export class ShoppingPageComponent implements OnInit {

  toggleListView: boolean = false;

  public loading$: boolean = true;

  constructor(
    private fakeStoreApiService: FakeStoreApiService, 
    private logService: LogService) {
     }

  items: Item[] = [];
  categories: string[] = [
    "All",
    "Electronics",
    "Jewelery",
    "Men's Clothing",
    "Women's Clothing",
  ]
  maxPrice: number = 0;
  backup: Item[] = [];

  toggleView(): void {
    this.toggleListView = !this.toggleListView;
  }


  getByCategory(category: string): void {
    category = category.toLowerCase();
    if(category === 'all') {
      this.getItems();
    } else {
      this.fakeStoreApiService.getProductsByCategory(category).subscribe(items => {
        this.items = items;
      })
    }
  }

  getItems(): void {
    this.fakeStoreApiService.getAllProducts().subscribe(items => {
      this.items = items;
      this.backup = items;
    })
  }

  sortByPriceHighToLow(): void {
    this.items.sort(function(a, b){
      return b.price - a.price;
    })
  }

  sortByPriceLowToHigh(): void {
    this.items.sort(function(a, b){
      return a.price - b.price;
    })
  }


  onChange(value: number) {
    console.log(value);
    this.maxPrice = value;
    this.items = this.backup;
    if(this.maxPrice <= 0 || this.maxPrice === null) {
      this.getItems();
    }
    this.items = this.items.filter((item) => {
      return item.price <= value;
    })
  }

  ngOnInit(): void {
    this.fakeStoreApiService.loading$.subscribe(
      loading => this.loading$ = loading
    )
    this.getItems();
  }

}
