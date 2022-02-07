import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  public warn(...data:any[]){
    console.warn(data);
  }
  public trace(...data:any[]){
    console.log(data);
  }
  public log(...data:any[]){
    console.log(data);
  }
  public error(...data:any[]){
    console.error(data);
  }
}
