import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Item } from 'src/app/models/item';
import { CartService } from 'src/app/services/cart.service';
import { FullItemService } from 'src/app/services/full-item.service';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private logService: LogService,
    private fullItemService: FullItemService) {

  }

  item!: Item; 
  isLiked: boolean = false;
  inCart: boolean = false;
  likedItems: number[] = [];

  @Input() itemPassed!: Item;

  like(): void {
    this.isLiked = !this.isLiked;
    this.likedItems.push(this.item.id);
    this.fullItemService.like();
  }
  
  addToCart(): void {
    this.cartService.addItem(this.item);
    this.inCart = !this.inCart;
    this.fullItemService.cart();
  }

  toggle(): void {
    this.fullItemService.setItem(this.itemPassed);
    this.fullItemService.toggle();
  }

  checkCart(id: number): void {
    let cart = this.cartService.cart.getValue();
    let hasItemInCart = cart.some( item => item['id'] === id);
    if(hasItemInCart) {
      this.inCart = true;
    }
  }

  ngOnInit(): void {
    this.item = this.itemPassed;
    this.checkCart(this.item.id);
  }

}
