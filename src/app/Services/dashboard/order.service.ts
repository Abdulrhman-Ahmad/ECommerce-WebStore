import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IorderAdmin } from 'src/app/Interfaces/order/iorder-admin';
import { OrderStatus } from 'src/app/Interfaces/order/order-status';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseURL: string = 'https://localhost:7003/api/Order';
  UserorderUrl : string ='https://localhost:7003/api/UserProfile/Orders';
  constructor(private http: HttpClient) {}
  

  // ---------------- [ Get All Orders ]
  GetAllOrders(PageIndex:number) : Observable<IorderAdmin[]>{
    return this.http.get<IorderAdmin[]>(`${this.baseURL}/GetAllOrders/${PageIndex}`);
  }

  // ---------------- [ Get Order By Id  ]
  GetOrderById(id:number) : Observable<IorderAdmin>{
    return this.http.get<IorderAdmin>(`${this.baseURL}/${id}`);
  }

  // ---------------- [ Get All User Orders ]
  GetAllUserOrders() : Observable<IorderAdmin[]>{
    return this.http.get<IorderAdmin[]>(`${this.UserorderUrl}`);
  }
}
