import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  BaseUrl : string = '';

  constructor(private httpclient:HttpClient) { }


}