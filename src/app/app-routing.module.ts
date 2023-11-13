
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Core/Home/home/home.component';
import { ContactusComponent } from './Components/Core/contactus/contactus.component';
import { LoginComponent } from './Components/Core/login/login.component';
import { RegisterComponent } from './Components/Core/register/register.component';
import { BlogComponent } from './Components/Core/blog/blog.component';
import { ProfileComponent } from './Components/Core/profile/profile.component';
import { ProductListComponent } from './Components/Core/product-list/product-list.component';
import { CartComponent } from './Components/Core/cart/cart.component';
import { NotfoundComponent } from './Components/Core/notfound/notfound.component';
import { AddressComponent } from './Components/Core/user profile/address/address.component';
import { AddAddressComponent } from './Components/Core/user profile/add-address/add-address.component';
import { GeneralInformationComponent } from './Components/Core/user profile/general-information/general-information.component';
import { OrderListComponent } from './Components/Core/user profile/order-list/order-list.component';
import { OrderdetailsComponent } from './Components/Core/user profile/orderdetails/orderdetails.component';
import { authGuard } from './Guards/auth.guard';
import { WishlistUserDashboardComponent } from './Components/Core/wishlist-user-dashboard/wishlist-user-dashboard.component';
import { FavoritesUserDashboardComponent } from './Components/Core/favorites-user-dashboard/favorites-user-dashboard.component';
import { ProductDetailsComponent } from './Components/Core/product-details/product-details.component';
import { CheckoutComponent } from './Components/Core/checkout/checkout.component';
import { DashhomeComponent } from './Components/Core/dashboard/dashhome/dashhome.component';
import { ProductsListDasboardComponent } from './Components/Core/dashboard/products-list-dasboard/products-list-dasboard.component';
import { ProductFormComponent } from './Components/Core/dashboard/product-form/product-form.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'contactus', component:ContactusComponent},
  {path:'blog', component:BlogComponent},
  {path:'login', component:LoginComponent, canActivate:[authGuard]},
  {path:'register', component:RegisterComponent, canActivate:[authGuard]},
  {path:'profile', component:GeneralInformationComponent, canActivate:[authGuard]},
  {path:'address', component:AddressComponent, canActivate:[authGuard]},
  {path:'wishlist', component:WishlistUserDashboardComponent, canActivate:[authGuard]},
  {path:'favorite', component:FavoritesUserDashboardComponent, canActivate:[authGuard]},
  {path:'add', component:AddAddressComponent, canActivate:[authGuard]},
  {path:'orders', component:OrderListComponent, canActivate:[authGuard]},
  {path:'orderdetails', component:OrderdetailsComponent, canActivate:[authGuard]},
  {path:'cart', component:CartComponent, canActivate:[authGuard]},
  {path:'products', component:ProductListComponent},
  {path:'products/details/:id', component:ProductDetailsComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'adminhome',component:DashhomeComponent},
  {path:'adminproducts',component: ProductsListDasboardComponent},
  {path:'products/new',component: ProductFormComponent},
  {path:'**', component:NotfoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
