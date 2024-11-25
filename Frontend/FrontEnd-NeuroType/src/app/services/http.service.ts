import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  apiUrl = "http://localhost:8000";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}

  get<T>(endpoint: string) {
    const headers = this.createAuthHeaders();
    return this.httpClient.get<T>(`${this.apiUrl}${endpoint}`, { headers });
  }

  post<T>(endpoint: string, body: any) {
    const headers = this.createAuthHeaders();
    return this.httpClient.post<T>(`${this.apiUrl}${endpoint}`, body, {
      headers,
    });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
