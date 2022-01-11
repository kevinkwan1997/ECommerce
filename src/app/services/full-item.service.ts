import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogService } from './log.service';
import { Item } from '../models/item';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class FullItemService {

  fullItem: BehaviorSubject<Item>
  $open = new BehaviorSubject<boolean>(false);
  $isLiked = new BehaviorSubject<boolean>(false);
  $inCart = new BehaviorSubject<boolean>(false);

  constructor(private logService: LogService, private cartService: CartService) {
    this.fullItem = new BehaviorSubject<Item>({
      id: 0,
      title: '',
      price: 0,
      category: '',
      description: '',
      image: '',
      rating: {
        rate: 0,
        count: 0
      }
    })
   }

   like(): void {
     if(this.$isLiked.getValue()){
       this.$isLiked.next(false);
     } else {
      this.$isLiked.next(true);
     }
   }

   cart(): void {
    if(this.$inCart.getValue()) {
      this.$isLiked.next(false);
    } else {
      this.$isLiked.next(true);
    }
   }

   getItem(): Observable<Item> {
     return this.fullItem;
   }

   setItem(item: Item): void {
    this.fullItem.next(item);
   }

   toggle(): void {
     if(this.$open.getValue()) {
       this.$open.next(false);
     } else {
       this.$open.next(true);
     }
   }
}
