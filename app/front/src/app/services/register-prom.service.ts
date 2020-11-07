import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class RegisterPromService {
  headers = new HttpHeaders({ timeout: `50000` }); 

  constructor(private http: HttpClient) { }

  postRegist(body):Observable<any> {
    return this.http.post<any>(`api/users`, body, {headers: this.headers});
  }
  getRegist():Observable<any> {
    return this.http.get<any>(`api/users`, {headers: this.headers});
  }
}
