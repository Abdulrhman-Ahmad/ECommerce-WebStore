import { Component } from '@angular/core';
import { Ibrandreturn } from 'src/app/Interfaces/brand/ibrandreturn';
import { BrandService } from 'src/app/Services/dashboard/brand.service';

@Component({
  selector: 'app-brand-list-dashboard',
  templateUrl: './brand-list-dashboard.component.html',
  styleUrls: ['./brand-list-dashboard.component.css']
})
export class BrandListDashboardComponent {
  brands:Ibrandreturn[] = [];


  constructor(private brandService:BrandService){}

  ngOnInit(): void {
    this.brandService.getAll().subscribe({
      next:(data) =>{this.brands= data},
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
    console.log(this.brands);
  }

  
  delete(id:number){
    this.brands = this.brands.filter(b => b.id !== id);
    this.brandService.delete(id).subscribe(() => {
    });
  }
}
