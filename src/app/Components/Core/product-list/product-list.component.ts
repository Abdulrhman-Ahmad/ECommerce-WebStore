import { WishlistService } from './../../../Services/wishlist.service';
import { FavoriteService } from './../../../Services/favorite.service';
import { IproductFilter } from './../../../Interfaces/iproductfilter';
import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/Interfaces/iproduct';
import { ProductlistService } from 'src/app/Services/productlist.service';
import { CartService } from 'src/app/Services/cart.service';
import { Iproductquantity } from 'src/app/Interfaces/iproductquantity';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

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

  constructor(private productlist: ProductlistService, private favoriteservice: FavoriteService, private wilshlistservice: WishlistService, private cartapi: CartService, private router: Router, private login:LoginService) { }

  // --------------- [ Loding the product on the initialization of this comonent ]
  ngOnInit(): void {
    this.productlist.getProducts(this.filters).subscribe(
      {
        next: (data) => this.products = data,
        error: () => console.log("failed to bring the data"),
        complete: () => console.log("Got Data Successfully!")
      }
    );
  }


  // -------------- [ Add to ]
  AddToFavorite(id: number) {
    // if the user not logged in then he have to log in at first
    // if (this.login.IsLoggedIn)
    // {
    //   this.router.navigate(['/login']);
    //   return
    // }
    this.favoriteservice.AddToFavorite(id).subscribe({
      next: () => console.log("adding to favorite.."),
      error: () => console.log("Error happened during adding to favorites"),
      complete: () => console.log("Added Successfully favorite")
    })
  }

  AddToWithList(id: number) {
    // if the user not logged in then he have to log in at first
    // if (this.login.IsLoggedIn)
    // {
    //   this.router.navigate(['/login']);
    //   return
    // }
    this.wilshlistservice.AddToWishlist(id).subscribe({
      next: () => console.log("adding to wishlist.."),
      error: () => console.log("Error happened during adding to wishlist"),
      complete: () => console.log("Added Successfully to wishlist")
    })
  }

  AddToCart(id: number) {
    // if the user not logged in then he have to log in at first
    // if (this.login.IsLoggedIn)
    // {
    //   this.router.navigate(['/login']);
    //   return
    // }
    let data: Iproductquantity = {
      productId: id,
      quantity: 1
    }
    this.cartapi.AddToCart(data).subscribe({
      next: (d) => console.log(d),
      error: (d) => console.log('failed to add to cart', d.message),
      complete: () => console.log('Successfully added to cart')
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
