import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  BaseUrl :string = "https://localhost:7003/api/Accounts/wishlist"
  constructor(private httpclient:HttpClient) { }

  AddToWishlist(id:number) :Observable<any>
  {
    return this.httpclient.post<any>(this.BaseUrl, id)
  }

  DeleteWishlist(id:number) :Observable<any>
  {
    return this.httpclient.delete<any>(`${this.BaseUrl}/${id}`);
  }
}
