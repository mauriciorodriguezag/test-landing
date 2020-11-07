import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegisterPromService {
  usersUrl = 'localhost:80/api';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  postRegist() {
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(this.usersUrl,{headers: headers});
  }
}
