import { ClaimsService } from './claims.service';
import { Injectable } from '@angular/core';
import { ILogin } from '../Interfaces/ilogin';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Itoken } from '../Interfaces/itoken';
import { Iclaims } from '../Interfaces/iclaims';
import { CurrentuserService } from './currentuser.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  IsLoggedIn = new BehaviorSubject<boolean>(false)
  CurrentUserName = new BehaviorSubject<string>('')

  BaseUrl: string = "http://localhost:5281/api/Accounts/Login"


  constructor(private httpclien: HttpClient, private claim: ClaimsService, private data: CurrentuserService) { }

  Login(user: ILogin): Observable<Itoken> {
    return this.httpclien.post<Itoken>(this.BaseUrl, user).pipe(tap((res: any) => {
      if (res)
      {
        localStorage.setItem('token', res.token);

        // getting the name of the user to display it in the  navbar
        let claims = JSON.parse(window.atob(res.token.split('.')[1]));
        this.CurrentUserName.next(claims[this.claim.claimTypes.GivenName])
      }

      if (localStorage.getItem('token'))
        this.IsLoggedIn.next(true)
    }))
  }

}
