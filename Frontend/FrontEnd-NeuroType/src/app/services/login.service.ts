import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Observable, BehaviorSubject } from "rxjs";
import { AuthService } from "./auth.service";

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

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ access_token: string }> {
    return this.httpService.post<{ access_token: string }>(
      this.apiUrl,
      credentials,
    );
  }

  setUserLogged(value: boolean): void {
    this.userLoggedSubject.next(value);
  }

  isUserLogged(): boolean {
    return this.userLoggedSubject.value;
  }
}
