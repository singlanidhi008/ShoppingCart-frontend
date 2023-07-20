import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {}
  _token = localStorage.getItem('token');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200', // Optional: Include the allowed origin here
    Authorization: `Bearer ${this._token}`,
  });
  options = { headers: this.headers, withCredentials: true };

  DeleteProduct(value: any): Observable<any> {
    const url=`https://localhost:44357/api/Product/DeleteProduct/${value.id}`
    debugger;
    return this._http.delete<any>(url, this.options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('An error occurred', error);
          return throwError(error.status);
        })
      );
  }
}
