import { Component, OnInit } from '@angular/core';
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

  constructor(
    private fakeStoreApiService: FakeStoreApiService, 
    private logService: LogService) { }

  items: Item[] = [];
  categories: string[] = [
    "All",
    "Electronics",
    "Jewelery",
    "Men's Clothing",
    "Women's Clothing",
  ]

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

  ngOnInit(): void {
    this.getItems();
  }

}
