import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Item } from '../models/item'
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, mapTo, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: BehaviorSubject<Item[]>;
  baseUrl = 'https://fakestoreapi.com'

  constructor(
    private logService: LogService) { 
      this.cart = new BehaviorSubject<Item[]>([]);
    }

  getCart(): Observable<Item[]> {
    return this.cart;
  }

  addItem(item: Item): void {
    let items = this.cart.getValue();
    let hasItem = items.some(i => i.id === item.id);
    if(!hasItem) {
      items.push(item);
      this.cart.next(items);
    } else {
      this.removeItem(item.id);
    }
  }

  removeItem(id: number): void {
    let items = this.cart.getValue();
    items = items.filter(item => {
      return item.id != id
    })
    this.cart.next(items);
  }
}
