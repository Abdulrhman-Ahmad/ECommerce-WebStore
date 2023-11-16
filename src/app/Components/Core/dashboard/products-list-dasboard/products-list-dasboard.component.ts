import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Interfaces/iproduct';
import { IproductFilter } from 'src/app/Interfaces/iproductfilter';
import { LoginService } from 'src/app/Services/login.service';
import { ProductlistService } from 'src/app/Services/productlist.service';

@Component({
  selector: 'app-products-list-dasboard',
  templateUrl: './products-list-dasboard.component.html',
  styleUrls: ['./products-list-dasboard.component.css']
})
export class ProductsListDasboardComponent {
  currentIndex: number = 1;
  products !: Iproduct[];

  filters: IproductFilter = {
    sort: '',
    categoryid: '',
    brandId: '',
    condition: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    search: '',
    pageSize: '',
    pageIndex: '1',
  }

  constructor(private productlist: ProductlistService, private router: Router, private login:LoginService) { }

  // ---------------- [ Load the Products ]
  ngOnInit(): void {

    // Load all the products only the first index
    this.productlist.getProducts(this.filters).subscribe(
      {
        next: (data) => this.products = data,
        error: (e) => console.log('Error: ', e),
        complete: () => console.log("Got Data Successfully!")
      }
    );

  }

  // ---------------- [ Delete Product ]
  // - there is a problem while deleting the prducts, foreigns can't be null there ?
  // yes, and can't fix it :( [must edit db to make table products on delete cascade]
  DeleteProduct(id:number){
    this.productlist.DeleteProduct(id).subscribe({
      next: (d) => console.log('Deleting...'),
      error:(e) => console.log('Error : ', e),
      complete: () => {
        console.log('Product Deleted Successfully!')
        this.products = this.products.filter(e=> e.id != id)
        console.log(id)
      }
    })
  }


  // --------------- [ Pageination ]
  next() {
    this.filters.pageIndex = (this.currentIndex + 1).toString();
    this.productlist.getProducts(this.filters).subscribe(
      {
        next: (data) => {
          if (data.length > 0) {
            this.currentIndex++
            this.products = data
          }
          else {
            this.filters.pageIndex = this.currentIndex.toString();
          }
        },
        error: () => console.log("failed to bring the data on the next page index"),
        complete: () => console.log("Got Data Successfully!")
      }
    );
  }
  prev() {
    if (this.currentIndex > 1) {
      this.filters.pageIndex = (this.currentIndex - 1).toString();
      this.productlist.getProducts(this.filters).subscribe(
        {
          next: (data) => {
            this.currentIndex--
            this.products = data
          },
          error: () => console.log("failed to bring the data on the next page index"),
          complete: () => console.log("Got Data Successfully!")
        }
      );
    }
  }
}
