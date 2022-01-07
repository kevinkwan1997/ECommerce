import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Item } from 'src/app/models/item';
import { LogService } from 'src/app/services/log.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private logService: LogService) { }

  cart: Item[] = [];
  total: number = 0;

  getCart(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.getTotal(cart);
    })
  }

  getTotal(cart: Item[]): void {
    let total = 0;
      cart.forEach(item => {
        total += item.price;
      })
      this.total = total;
  }

  removeFromCart(id: number): void {
    this.cartService.removeItem(id);
    this.cart = this.cart.filter(item => item.id !== id);
  }

  ngOnInit(): void {
    this.getCart();
  }

}
