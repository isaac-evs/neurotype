import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable, BehaviorSubject } from "rxjs";
import { AuthService } from "./auth.service";
import { User, UserLogin } from "../types/user";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private apiUrl = "/login";

  private userLoggedSubject = new BehaviorSubject<boolean>(false);
  public userLogged$ = this.userLoggedSubject.asObservable();

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) {}

  login(user: UserLogin): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  
    // Construimos el cuerpo en formato x-www-form-urlencoded
    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('password', user.password);
  
    return this.httpService.post<any>('/login', body.toString(), { headers });
  }

  setUserLogged(value: boolean): void {
    this.userLoggedSubject.next(value);
  }

  isUserLogged(): boolean {
    return this.userLoggedSubject.value;
  }
}
