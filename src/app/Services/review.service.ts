import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ireview } from '../Interfaces/ireview';
import { Iwritereview } from '../Interfaces/iwritereview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  AllReviewsUrl : string = "https://localhost:7003/api/Review/GetAllReviews";
  AddReviewUrl  : string = "https://localhost:7003/api/Review";

  constructor(private httpclient: HttpClient) { }

  // ------------------- [ Get All Reviews]
  GetAll() : Observable<Ireview[]>{
    return this.httpclient.get<Ireview[]>(this.AllReviewsUrl);
  }

  // ------------------- [ Add New Review ]
  AddReview(data : Iwritereview) : Observable<Iwritereview>{
    return this.httpclient.post<Iwritereview>(this.AddReviewUrl, data)
  }

}
