
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ireviewreturn } from 'src/app/Interfaces/review/Ireviewreturn';



@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseURL: string = 'https://localhost:7003/api/Review';
  constructor(private http: HttpClient) {}

  getAll(PageIndex?:number) : Observable<Ireviewreturn[]>{
    const url = PageIndex ? `${this.baseURL}/GetAllReviews?pageIndex=${PageIndex}` : `${this.baseURL}/GetAllReviews`;
    return this.http.get<Ireviewreturn[]>(url);
  }

  delete(id:number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
