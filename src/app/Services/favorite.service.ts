import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ifavorite } from '../Interfaces/ifavorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  BaseUrl :string = "https://localhost:7003/api/Accounts/favourite"
  constructor(private httpclient:HttpClient) { }

  // get all (GET)
  GetFavorite(): Observable<Ifavorite[]>{
    return this.httpclient.get<Ifavorite[]>(this.BaseUrl);
  }

  // Add Favorite (POST)
  AddToFavorite(id:number) :Observable<any>
  {
    return this.httpclient.post<any>(`${this.BaseUrl}/${id}`,{})
  }

  // Delete Favorite (Delete)
  DeleteFavorite(id:number) :Observable<any>
  {
    return this.httpclient.delete<any>(`${this.BaseUrl}/${id}`);
  }

}
