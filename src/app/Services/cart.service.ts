import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  BaseUrl :string = ""
  constructor(private httpclient:HttpClient) { }

  AddToCart(id:number) :Observable<any>
  {
    return this.httpclient.post<any>(this.BaseUrl, id)
  }

  DeleteCart(id:number) :Observable<any>
  {
    return this.httpclient.delete<any>(`${this.BaseUrl}/${id}`);
  }

}
