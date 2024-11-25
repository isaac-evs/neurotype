import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'localhost:3000/register';
  private userRegisteredSubject = new BehaviorSubject<boolean>(false); 
  public userRegistered$ = this.userRegisteredSubject.asObservable();

  constructor(private httpService: HttpService) {}

  register(userData: User): Observable<{token: string}> {
    console.log(this.apiUrl, userData);
    return this.httpService.post(this.apiUrl, userData);
  }

  isUserRegistered(): boolean {
    return this.userRegisteredSubject.value;  
  }

  setUserRegistered(value: boolean){
    this.userRegisteredSubject.next(value)
  }
}