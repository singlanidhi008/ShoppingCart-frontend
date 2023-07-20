import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  jwtHelper: any;

  constructor(private _http: HttpClient, private router: Router) {
    this.jwtHelper = new JwtHelperService();
  }
  _url = 'https://localhost:44357/api/Auth/login';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
  });

  options = { headers: this.headers, withCredentials: true };

  userExist(value: any): Observable<any> {
    return this._http.post<any>(this._url, value, this.options);
  }

  SecondUrl = 'https://localhost:44357/api/Auth/register';

  userSignUp(value: any): Observable<any> {
    return this._http.post<any>(this.SecondUrl, value, this.options).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error Occured:', error);
        return throwError(error.status);
      })
    );
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  StoreUserRole(Role: string) {
    localStorage.setItem('role', Role);
  }
  
  GetUserRole() {
    return localStorage.getItem('role');
  }
}
