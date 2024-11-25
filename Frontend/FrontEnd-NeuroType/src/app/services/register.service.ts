import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpService } from "./http.service";
import { User, AuthResponse } from "../types/user";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  private apiUrl = "/register";

  private userRegisteredSubject = new BehaviorSubject<boolean>(false);
  public userRegistered$ = this.userRegisteredSubject.asObservable();

  constructor(private httpService: HttpService) {}

  register(userData: User): Observable<AuthResponse> {
    return this.httpService.post<AuthResponse>(this.apiUrl, userData);
  }

  setUserRegistered(value: boolean): void {
    this.userRegisteredSubject.next(value);
  }

  isUserRegistered(): boolean {
    return this.userRegisteredSubject.value;
  }
}
