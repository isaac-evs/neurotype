import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import {BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'localhost:300/login';

  private userLogedSubject = new BehaviorSubject<boolean>(false); 
  public userLoged$ = this.userLogedSubject.asObservable();

  constructor(private httpService:HttpService, private authService: AuthService) { }

  login(credentials:{email:string, password:string}){
    this.httpService.post<{token: string}>(this.apiUrl, credentials).subscribe((response)=>{
      this.userLogedSubject.next(true)
      this.authService.setToken(response.token)
    });
  }

  isUserLoged(){
    return this.userLogedSubject.value;
  }
}
