import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  BaseUrl :string = 'https://localhost:7003/api/UserProfile/get-phones'

  constructor(private httpclient:HttpClient) { }

  
}
