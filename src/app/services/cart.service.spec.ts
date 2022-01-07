import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { LogService } from './log.service';
import { Item } from '../models/item'
import { Subject } from 'rxjs';

const testProduct: Item = {
  id: 1,
  title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  price: 109.95,
  description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  category: "men's clothing",
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  rating: {
    rate: 3.9,
    count: 120
  }
}

describe('CartService', () => {
  let service: CartService;
  let logService: LogService
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    let spy = jasmine.createSpyObj('LogService', ['log']);
    let subjectSpy = jasmine.createSpyObj('CartService', ['cart'])
    let httpClient: HttpClient

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [CartService, { provide: LogService, useValue: spy}]
    });
    service = TestBed.inject(CartService);
    logService = TestBed.inject(LogService) as jasmine.SpyObj<LogService>
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  describe('Testing Cart Functionality', () => {
    it('should get cart', () => {
      service.getCart().subscribe(cart => {
        expect(cart.length).toBe(0);
        expect(service.getCart()).toHaveBeenCalled();
      })

    })
    it('should add item to cart', waitForAsync(() => {
      service.addItem(testProduct);
      service.cart.subscribe(cart => {
        expect(cart.length).toBe(1);
      })

      
    }))
    it('should remove item from cart', () => {
      service.removeItem(testProduct.id);
      service.cart.subscribe(cart => {
        expect(service.removeItem).toHaveBeenCalled();
        expect(cart.length).toEqual(0);
      })
    })
  })
  
});
