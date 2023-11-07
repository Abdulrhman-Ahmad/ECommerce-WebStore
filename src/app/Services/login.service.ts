import { Injectable } from '@angular/core';
import { ILogin } from '../Interfaces/ilogin';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Itoken } from './itoken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BaseUrl :string = "https://localhost:7003/api/Accounts/Login"

  constructor(private httpclien:HttpClient) { }

  Login(user :ILogin): Observable<Itoken>{
    return this.httpclien.post<Itoken>(this.BaseUrl, user)
  }

}
