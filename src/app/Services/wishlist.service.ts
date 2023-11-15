import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iwishlist } from '../Interfaces/iwishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  BaseUrl :string = "https://localhost:7003/api/UserProfile/wishlist"
  constructor(private httpclient:HttpClient) { }

  // get all (GET)
  GetWishlist(): Observable<Iwishlist[]>{
    return this.httpclient.get<Iwishlist[]>(this.BaseUrl);
  }

  // add wishlist (POST)
  AddToWishlist(id:number) :Observable<any>
  {
    return this.httpclient.post<any>(`${this.BaseUrl}/${id}`,{})
  }

  // delete wishlist (DELETE)
  DeleteWishlist(id:number) :Observable<any>
  {
    return this.httpclient.delete<any>(`${this.BaseUrl}/${id}`);
  }

}
