import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { AuthService } from "./auth.service";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../types/user";
import { Notes } from "../types/notes";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userInfo = new BehaviorSubject<Notes | null>(null);
  public userInfo$ = this.userInfo.asObservable();

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) {}

  private apiUrl = "localhost:300/User";

  getUserData() {
    const token = this.authService.getToken();
    if (token) {
      this.httpService
        .post<Notes>(this.apiUrl, {})
        .pipe(map((response) => response as Notes))
        .subscribe({
          next: (notes: Notes) => {
            this.userInfo.next(notes);
          },
          error: (err) => {
            console.error("Error al obtener los datos del usuario", err);
            this.userInfo.next(null);
          },
        });
    } else {
      console.warn("No se encontró un token de autenticación.");
    }
  }

  postNote(note: string): Observable<any> {
    const token = this.authService.getToken();
    if (token) {
      return this.httpService.post(this.apiUrl, { note });
    } else {
      throw new Error("Token no disponible. El usuario no está autenticado.");
    }
  }
}
