// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class WishListService {
//   public wishListCounter$=new BehaviorSubject<number>(0);

//   constructor(private myClient:HttpClient) { }

//   GetUserWishListProductsId()
//   {
//     return this.myClient.get("https://localhost:7064/api/WishList/ProductsId");
//   }

//   // GetUserWishListProducts()
//   {
//     return this.myClient.get("https://localhost:7064/api/WishList");
//   }

//   AddOrDeleteWishList(productId:number)
//   {
//     return this.myClient.get("https://localhost:7064/api/WishList/Add/"+productId);
//   }

//   GetWishListCount()
//   {
//     var counter = this.myClient.get("https://localhost:7064/api/WishList/Count");
//     counter.subscribe({
//       next:(data)=>{
//         console.log("next");
//         console.log(data);
//         this.wishListCounter$.next(data as number);

//       },
//       error:(error)=>{
//         console.log("error");
//         console.log(error);


//       }
//     })
//   }



// }
