import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/Interfaces/iproduct';
import { Iproductquantity } from 'src/app/Interfaces/iproductquantity';
import { CartService } from 'src/app/Services/cart.service';
import { FavoriteService } from 'src/app/Services/favorite.service';
import { ProductlistService } from 'src/app/Services/productlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product :Iproduct= {
    id: 0,
    name: '',
    description: '',
    price: 0,
    discount: 0,
    priceAfter: 0,
    condition: 0,
    model: '',
    color: '',
    storage: 0,
    ram: 0,
    carmera: '',
    cpu: '',
    screenSize: 0,
    batteryCapacity: 0,
    osVersion: '',
    categoryID: 0,
    categoryName: '',
    brandID: 0,
    brandName: '',
    warranties: [],
    images: [],
    avgRating: 0,
    avgRatingRounded: 0
  };

  productId !: number;
  currentImage : string = '';
  quantity : number = 1;

  constructor(private productapi:ProductlistService, private route : ActivatedRoute, private cartapi: CartService, private router:Router, private favoriteapi: FavoriteService){}

  ngOnInit(): void {
    this.route.params.subscribe(
      d=> this.productId = d['id']
    )

    this.productapi.GetProductById(this.productId).subscribe({
      next: (d) => {
        this.product = d;
        this.currentImage= d.images[0]
      },
      error:(e) => console.log(e),
      complete: () => console.log('Successfully Got the product!')
    })
  }

  LoadImage(src :string)
  {
    this.currentImage = src;
  }

  //------------- [ Add To Cart ]
  AddToCart() {
    let data: Iproductquantity = {
      productId: this.productId,
      quantity: this.quantity
    }
    this.cartapi.AddAmount(data).subscribe({
      next: (d) => console.log(d),
      error: (d) => console.log('failed to add to cart', d.message),
      complete: () => console.log(`Successfully added [${data.quantity}] to cart`)
    })
  }

  buy(){
    let data: Iproductquantity = {
      productId: this.productId,
      quantity: this.quantity
    }
    this.cartapi.AddAmount(data).subscribe({
      next: (d) => console.log(d),
      error: (d) => console.log('failed to add to cart', d.message),
      complete: () => {
        console.log(`Successfully added [${data.quantity}] to cart`)
        this.router.navigate(['cart'])
      }
    })
  }

  // ------------- [ Add To Favorite ]
  AddToFavorite(){
    this.favoriteapi.AddToFavorite(this.productId).subscribe({
      next: (d) => console.log('Adding to Cart', d),
      error: (e) => console.log(e),
      complete: () => console.log('Successfully Added to Cart!')
    })
  }


}
