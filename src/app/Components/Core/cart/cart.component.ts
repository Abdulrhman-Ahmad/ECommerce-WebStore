import { Component, OnInit } from '@angular/core';
import { Icart } from 'src/app/Interfaces/icart';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart !: Icart[];

  constructor(private cartapi: CartService){}

  ngOnInit(): void {
    this.cartapi.GetCart().subscribe({
      next: (d) => this.cart = d,
      error: (e) => console.log(e),
      complete:()=> {
        console.log('Successfully Got Cart')
      }
    })
  }

  deletecart(id:number)
  {
    this.cartapi.DeleteCart(id).subscribe({
      next: (d) => console.log('Deleting the Cart'),
      error: (e) => console.log(e),
      complete: () => {
        console.log('Cart deleted Successfully!')
        this.cart = this.cart.filter(c => c.productId != id)
      }
    })
  }

}
