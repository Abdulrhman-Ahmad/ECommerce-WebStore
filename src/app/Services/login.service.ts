import { Injectable } from '@angular/core';
import { ILogin } from '../Interfaces/ilogin';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Itoken } from './itoken';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  IsLoggedIn = new BehaviorSubject<boolean>(false)

  BaseUrl :string = "https://localhost:7003/api/Accounts/Login"

  constructor(private httpclien:HttpClient) { }

  Login(user :ILogin): Observable<Itoken>{
    return this.httpclien.post<Itoken>(this.BaseUrl, user).pipe(tap((res :any)=>
    {
      if (res)
      localStorage.setItem('token',res.token)
      if (localStorage.getItem('token'))
        this.IsLoggedIn.next(true)
    }))
  }

}
