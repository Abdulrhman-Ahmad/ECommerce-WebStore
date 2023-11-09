import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  BaseUrl :string = "https://localhost:7003/api/Accounts/favourite"
  constructor(private httpclient:HttpClient) { }

  AddToFavorite(id:number) :Observable<any>
  {
    return this.httpclient.post<any>(this.BaseUrl, id)
  }

  DeleteFavorite(id:number) :Observable<any>
  {
    return this.httpclient.delete<any>(`${this.BaseUrl}/${id}`);
  }

}
