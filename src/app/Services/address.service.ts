import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegister } from '../Interfaces/iregister';
import { Iaddress } from '../Interfaces/iaddress';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  BaseUrl :string = "https://localhost:7003/api/UserProfile/Address";

  constructor(private httpclient :HttpClient) { }

  GetAddresses () : Observable<any>{
    return this.httpclient.get<any>(this.BaseUrl + "es");
  }

  // adding new Address
  AddAddress( address : Iaddress): Observable<Iaddress>{
    return this.httpclient.post<Iaddress>(this.BaseUrl, address )
  }
}
