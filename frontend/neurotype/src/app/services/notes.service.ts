import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotesService {
  private apiUrl = "http://your-backend-api-url/notes";

  constructor(private http: HttpClient) {}

  getNotes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  createNote(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, data);
  }

  updateNote(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getDailyAnalysis(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily-analysis`, {
      params: { analysis_date: date },
    });
  }
}
