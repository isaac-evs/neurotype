import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$ = this.tokenSubject.asObservable();


  constructor() {
    const storedToken = localStorage.getItem('token');
    this.tokenSubject.next(storedToken); 
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken(): string | null {
    return this.tokenSubject.value; 
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null); 
  }

  isLoggedIn(): boolean {
    return this.tokenSubject.value !== null;  
  }
}