import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _token = localStorage.getItem('token');
  httpHeaders!:HttpHeaders
  constructor(private _http: HttpClient) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
    this.httpHeaders = new HttpHeaders().set('Authorization',`Bearer ${this._token}`)
  }
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    Authorization: `Bearer ${this._token}`,
  });

  options = { headers: this.headers, withCredentials: true };

  baseUrl:any='https://localhost:44357/api/Product/';

  AllProducts(searchString:string,pageSize:number,pageNumber:number,orderBy:string): Observable<any> {
       const url=`${this.baseUrl}GetAllProducts?searchString=${searchString}&pageSize=${pageSize}&pageNumber=${pageNumber}&orderBy=${orderBy}`
    return this._http.get<any>(url, this.options).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error Occured:', error);
        return throwError(error.status);
      })
    );
  }
   AddProductApi = `${this.baseUrl}Add`;
    
  AddProduct(value: FormData): Observable<any> {
    return this._http.post<any>(this.AddProductApi, value, {headers:this.httpHeaders}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('An error Occured:', error);
        return throwError(error.status);
      })
    );
  }

  GetProductById(id: any): Observable<any> {
  
    return this._http.get<any>(`${this.baseUrl}GetById/` + id,
        this.options
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log('An error Occured', error);
          return throwError(error.status);
        })
      );
  }

  
  UpdateProduct(id:any,data:any):Observable<any>
  {
    const url=`${this.baseUrl}${id}`
    return this._http.put<any>(url, data, {headers:this.httpHeaders})
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('An error Occured', error);
        return throwError(error.status);
      })
    );
  }

 

  DeleteProduct(value: any): Observable<any> {
    const url=`${this.baseUrl}DeleteProduct/${value.id}`
    console.log(" before delete")
    return this._http.delete<any>(url,this.options);
  }
  private newoptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._token}`
  }),
  responseType: 'blob' as 'json'
};

    ExportToExcel():Observable<any>{
      
        const url=`${this.baseUrl}ExportProductsToExcel`
        return this._http.get<any>(url,this.newoptions);
    }
    UploadFile(file:File):Observable<any>{
      const formData = new FormData();
      formData.append('file', file);
      const url=`${this.baseUrl}ImportData`
       return this._http.post(url,formData,{headers:this.httpHeaders});
    }


}
