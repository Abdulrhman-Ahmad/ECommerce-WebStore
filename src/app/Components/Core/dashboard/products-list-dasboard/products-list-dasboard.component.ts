import { Component } from '@angular/core';
import { Iproductreturn } from 'src/app/Interfaces/product/iproductreturn';
import { ProductOperationService } from 'src/app/Services/dashboard/product-operation.service';

@Component({
  selector: 'app-products-list-dasboard',
  templateUrl: './products-list-dasboard.component.html',
  styleUrls: ['./products-list-dasboard.component.css']
})
export class ProductsListDasboardComponent {
  products:Iproductreturn[] = [];
  pageIndex:number =1;

  constructor(private prodService:ProductOperationService){}

  ngOnInit(): void {
    this.prodService.getAll().subscribe({
      next:(data) =>{this.products= data},
      error:(error)=>{console.log('error'+error)},
      complete: ()=>{},
    });
    console.log(this.products);
  }

  // --------------- [ Pageination ]
  next() {
    this.pageIndex = this.pageIndex + 1
    this.prodService.getAll(this.pageIndex).subscribe(
      {
        next: (data) => {
          if (data.length > 0) {
            this.products = data
          }
          else {
            this.pageIndex = this.pageIndex - 1;
          }
        },
        error: () => console.log("failed to bring the data on the next page index"),
        complete: () => console.log("Got Data Successfully!")
      }
    );
  }

  prev() {
    if (this.pageIndex > 1) {
      this.pageIndex = this.pageIndex - 1 ;
      this.prodService.getAll(this.pageIndex).subscribe(
        {
          next: (data) => {
            this.products = data
          },
          error: () => console.log("failed to bring the data on the next page index"),
          complete: () => console.log("Got Data Successfully!")
        }
      );
    }

  }

  delete(id:number){
    this.products = this.products.filter(p => p.id !== id);
    this.prodService.delete(id).subscribe(() => {
    });
  }
}