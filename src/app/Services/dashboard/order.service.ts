import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IorderAdmin } from 'src/app/Interfaces/order/iorder-admin';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseURL: string = 'https://localhost:7003/api/Order';
  constructor(private http: HttpClient) {}
  

  // ---------------- [ Get All Orders ]
  GetAllOrders(PageIndex:number) : Observable<IorderAdmin[]>{
    return this.http.get<IorderAdmin[]>(`${this.baseURL}/GetAllOrders/${PageIndex}`);
  }

  
}
