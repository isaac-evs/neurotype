import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private actualLocation = new BehaviorSubject<string>('main'); 
  public actualLocation$ = this.actualLocation.asObservable();

  constructor() { }

  getActualLocation(){
    return this.actualLocation$
  }

  setActualLocation(location: string){
    this.actualLocation.next(location)
  }
}
