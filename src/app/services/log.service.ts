import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  
  log(msg: any, ...optionalParams: any[]) {
    console.log(new Date() + ": " + JSON.stringify(msg) + ", " + optionalParams )
  }

  constructor() { }
}
