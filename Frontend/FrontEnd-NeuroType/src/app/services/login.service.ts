import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import {BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'localhost:300/login';

  private userLogedSubject = new BehaviorSubject<boolean>(false); 
  public userLoged$ = this.userLogedSubject.asObservable();

  constructor(private httpService:HttpService, private authService: AuthService) { }

  login(credentials: {email: string, password: string}): Observable<{ token: string }> {
    return this.httpService.post<{ token: string }>(this.apiUrl, credentials);
  }

  isUserLoged(){
    return this.userLogedSubject.value;
  }

  setUserLogged(value : boolean){
    this.userLogedSubject.next(value)
  }
}
