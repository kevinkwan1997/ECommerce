import { Component, OnInit } from '@angular/core';
import { FullItemService } from 'src/app/services/full-item.service';
import { LogService } from 'src/app/services/log.service';
import { fullItemEnterAnimation } from 'src/app/animations';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-full-item',
  templateUrl: './full-item.component.html',
  styleUrls: ['./full-item.component.scss'],
  animations: [ fullItemEnterAnimation ]
})
export class FullItemComponent implements OnInit {

  open: boolean = false;
  liked: boolean = false;
  inCart: boolean = false;
  item: Item = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
      rate: 0,
      count: 0
    }
  }

  constructor(
    private fullItemService: FullItemService,
    private logService: LogService,
    private cartService: CartService) { 
    }

  ngOnInit(): void {
    this.init();
  }
  
  checkCart(id: number): void {
    let cart = this.cartService.cart.getValue();
    let hasItemInCart = cart.some( item => item['id'] === id);
    if(hasItemInCart) {
      this.inCart = true;
    }
  }

  init(): void {
    this.fullItemService.$open.subscribe(bool => {
      this.open = bool;
    })
    this.fullItemService.fullItem.subscribe(item => {
      this.item = item;
    })
    this.fullItemService.$inCart.subscribe(bool => {
      this.inCart = bool;
      this.checkCart(this.item.id);
    })

  }

  toggle(): void {
    this.fullItemService.toggle();
  }

}
