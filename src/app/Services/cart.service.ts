import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproductquantity } from '../Interfaces/iproductquantity';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // ---------------- [ Urls ]
  CartUrl :string = "https://localhost:7003/api/UserCart/CartProducts"
  AddCartUrl : string = "https://localhost:7003/api/UserCart/AddProductToCart"
  DeleteCartUrl : string = "https://localhost:7003/api/UserCart/DeleteProductFromCart?productId="
  CartQuantityUrl : string = "https://localhost:7003/api/UserCart/EditCartProductQuntity?"

  constructor(private httpclient:HttpClient) { }

  // Get all Cart
  GetCart () : Observable<any[]>{
    return this.httpclient.get<any[]>(this.CartUrl);
  }


  // Add to cart
  // Iadd
  AddToCart(data : Iproductquantity) :Observable<Iproductquantity>
  {
    return this.httpclient.post<Iproductquantity>(this.AddCartUrl, data)
  }

  // delete Cart
  DeleteCart(id:number) :Observable<any>
  {
    return this.httpclient.delete<any>(`${this.DeleteCartUrl} + ${id}`);
  }

  // Update Amount
  // we use productQuantity interface
  AddAmount(data : Iproductquantity) :Observable<any>{

    // Creating Url Params
    let params = new URLSearchParams({
      productId : data.productId.toString(),
      newQuantity : data.quantity.toString()
    })

    return this.httpclient.put<any>(this.CartQuantityUrl + params, data)
  }

}
