import { Component } from '@angular/core';
import { Icategoryreturn } from 'src/app/Interfaces/category/icategoryreturn';
import { CategoryService } from 'src/app/Services/dashboard/category.service';

@Component({
  selector: 'app-category-list-dashboard',
  templateUrl: './category-list-dashboard.component.html',
  styleUrls: ['./category-list-dashboard.component.css']
})
export class CategoryListDashboardComponent {
  cats:Icategoryreturn[] = [];


  constructor(private catService:CategoryService){}

  ngOnInit(): void {
    this.catService.getAll().subscribe({
      next:(data) =>{this.cats= data},
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
    console.log(this.cats);
  }

  
  delete(id:number){
    this.cats = this.cats.filter(c => c.id !== id);
    this.catService.delete(id).subscribe(() => {
    });
  }
}
