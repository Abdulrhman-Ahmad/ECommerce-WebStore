import { Component, OnInit } from '@angular/core';
import { Ireview } from 'src/app/Interfaces/ireview';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  reviews !: Ireview[];

  constructor(private reviewapi : ReviewService){}

  ngOnInit(): void {
    // --------------- [ Get All reviews ]
    this.reviewapi.GetAll().subscribe({
      next:    (d) =>   this.reviews = d,
      error:   (e) =>   console.log('Unable to get all the reviews',e),
      complete:( ) => console.log('Successfully Got Reviews!')
    })


  }

  getTooltip(index: number): string {
    return `Rating ${index + 1}`;
  }

  fill(index: number): void {

  }





}
