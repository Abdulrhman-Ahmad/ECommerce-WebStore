import { IRegister } from './../Interfaces/iregister';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
Observable

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  BaseUrl :string = "http://localhost:7003/api/Accounts/Register";

  constructor(private httpclient :HttpClient) { }

  // adding new user
  Register( user : IRegister): Observable<IRegister>{
    return this.httpclient.post<IRegister>(this.BaseUrl, user )
  }

}
