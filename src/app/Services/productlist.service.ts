import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../Interfaces/iproduct';
import { IproductFilter } from '../Interfaces/iproductfilter';

@Injectable({
  providedIn: 'root'
})
export class ProductlistService {


  BaseUrl: string = "https://localhost:7003/api/Products/All";
  ProductUrl: string = "https://localhost:7003/api/Products/";

  constructor(private http: HttpClient) { }

  getProducts(queryParams: IproductFilter): Observable<Iproduct[]> {

    // declaring an HttpParams() to add it to the url
    let params = new HttpParams();

    // looping over the object to
    Object.keys(queryParams).forEach(key => {
      const value = queryParams[key];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value);
      }
    });

    return this.http.get<Iproduct[]>(this.BaseUrl, { params });

  }

  GetProductById(id:number) : Observable<Iproduct>{
    return this.http.get<Iproduct>(this.ProductUrl + id)
  }
}


