import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibrandreturn } from 'src/app/Interfaces/brand/ibrandreturn';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  baseURL: string = 'https://localhost:44365/api/Brand';
  constructor(private http: HttpClient) {}

  getAll() : Observable<Ibrandreturn[]>{
    return this.http.get<Ibrandreturn[]>(`${this.baseURL}/All`);
  }

  getById(id:number): Observable<Ibrandreturn> {
    return this.http.get<Ibrandreturn>(`${this.baseURL}/${id}`);
  }

  add(brand:Ibrandreturn) {
    return this.http.post(this.baseURL,brand);
  }

  edit(id:number , brand:Ibrandreturn) {
    return this.http.put(`${this.baseURL}/${id}`,brand);
  }

  delete(id:number) {
    return this.http.delete(`${this.baseURL}?id=${id}`);
  }
}
