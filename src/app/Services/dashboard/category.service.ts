import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icategoryreturn } from 'src/app/Interfaces/category/icategoryreturn';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseURL: string = 'https://localhost:44365/api/Category';
  constructor(private http: HttpClient) {}

  getAll() : Observable<Icategoryreturn[]>{
    return this.http.get<Icategoryreturn[]>(`${this.baseURL}/All`);
  }

  delete(id:number) {
    return this.http.delete(`${this.baseURL}?id=${id}`);
  }
}
