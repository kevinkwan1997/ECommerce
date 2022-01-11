import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators';

import { LogService } from './log.service';
import { Item } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class FakeStoreApiService {

  baseUrl = 'https://fakestoreapi.com'
  loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient,
    private logService: LogService) {
      this.loading$.next(true);
   }

   getAllProducts(): Observable<Item[]> {
     let url = `${this.baseUrl}/products`
     return this.http.get<Item[]>(url)
      .pipe(
        tap(_ => {
          this.logService.log('Fetched all products')
          this.loading$.next(false);
        }),
        catchError(this.handleError<Item[]>('getAllProducts', []))
      )
     
   }

   getLoading(): Observable<boolean> {
     return this.loading$;
   }

   getProduct(id: number): Observable<Item> {
     let url = `${this.baseUrl}/products/${id}`
     return this.http.get<Item>(url)
      .pipe(
        tap(_ => {
          this.logService.log(`Fetched product id = ${id}`)
        }),
        catchError(this.handleError<Item>('getProduct'))
      )
   }

   getCategories(): Observable<string[]> {
     let url = `${this.baseUrl}/products/categories`
     return this.http.get<string[]>(url)
      .pipe(
        tap(_ => {
          this.logService.log(`Fetched categories`)
        }),
        catchError(this.handleError<string[]>('getCategories'))
      )
   }

   getProductsByCategory(category: string): Observable<Item[]> {
     this.loading$.next(true);
     let url = `${this.baseUrl}/products/category/${category}`
     return this.http.get<Item[]>(url)
      .pipe(
        tap(_ => { 
          this.logService.log(`Fetched products in category = ${category}`);
          this.loading$.next(false);
        }),
        catchError(this.handleError<Item[]>('getPRoductsByCategory', []))
      )

   }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.logService.log(`Operation ${operation} failed`)

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
