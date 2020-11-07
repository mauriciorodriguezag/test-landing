import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class RegisterPromService {
  headers = new HttpHeaders();
  urlbase = `http://localhost:85/api/`

  constructor(private http: HttpClient) { }

  postRegist(body):Observable<any> {
    return this.http.post<any>(`${this.urlbase}users`, body, {
      headers: this.headers
    });
  }
  getRegist():Observable<any> {
    return this.http.get<any>(`${this.urlbase}users`, {
      observe: 'response',
      responseType: 'blob' as 'json',
      headers: this.headers,
    });
  }
  getWinner():Observable<any> {
    return this.http.get<any>(`${this.urlbase}users/winn`, {
      headers: this.headers,
    });
  }

  getDeparmentsAndCities(){
    return this.http.get<any>(`assets/departments.json`, {
      headers: this.headers,
    });
  }
}
