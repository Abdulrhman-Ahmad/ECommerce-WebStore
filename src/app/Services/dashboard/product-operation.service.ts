import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproductadd } from 'src/app/Interfaces/product/iproductadd';
import { Iproductreturn } from 'src/app/Interfaces/product/iproductreturn';

@Injectable({
  providedIn: 'root'
})
export class ProductOperationService {
  baseURL: string = 'https://localhost:44365/api/Products';
  constructor(private http: HttpClient) {}

  getAll(PageIndex?:number) : Observable<Iproductreturn[]>{
    const url = PageIndex ? `${this.baseURL}/All?pageIndex=${PageIndex}` : `${this.baseURL}/All`;
    return this.http.get<Iproductreturn[]>(url);
  }

  getById(id:number): Observable<Iproductreturn> {
    return this.http.get<Iproductreturn>(`${this.baseURL}/${id}`);
  }

  add(prd:Iproductadd) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });
    return this.http.post(this.baseURL,prd, { headers });
  }

  edit(id:number , prd:Iproductadd) {
    return this.http.put(`${this.baseURL}/${id}`,prd);
  }

  delete(id:number) {
    return this.http.delete(`${this.baseURL}?id=${id}`);
  }
}