import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiUrl = 'localhost:3000/'

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  get<T>(url: string) {
    const headers = this.createAuthHeaders();
    return this.httpClient.get<T>(url, { headers });
  }

  post<T>(url: string, body: any) {
    const headers = this.createAuthHeaders();
    return this.httpClient.post<T>(url, body, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
}