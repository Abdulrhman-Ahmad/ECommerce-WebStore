import { ProductsListDasboardComponent } from './Components/Core/dashboard/products-list-dasboard/products-list-dasboard.component';
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
import { DashhomeComponent } from './Components/Core/dashboard/dashhome/dashhome.component';
import { ProductFormComponent } from './Components/Core/dashboard/product-form/product-form.component';
import { CategoryListDashboardComponent } from './Components/Core/dashboard/categories/category-list-dashboard/category-list-dashboard.component';
import { BrandListDashboardComponent } from './Components/Core/dashboard/brands/brand-list-dashboard/brand-list-dashboard.component';
import { UsersListAdminDashboardComponent } from './Components/Core/dashboard/users/users-list-admin-dashboard/users-list-admin-dashboard.component';
import { OrdersListDashboardComponent } from './Components/Core/dashboard/orders/orders-list-dashboard/orders-list-dashboard.component';
import { ReviewsListAdminDashboardComponent } from './Components/Core/dashboard/reviews/reviews-list-admin-dashboard/reviews-list-admin-dashboard.component';
import { ContactAdminDashboardComponent } from './Components/Core/dashboard/contactus/contact-admin-dashboard/contact-admin-dashboard.component';
import { CategoryFormDashboardComponent } from './Components/Core/dashboard/categories/category-form-dashboard/category-form-dashboard.component';

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
  {path:'adminhome',component:DashhomeComponent},
  {path:'adminproducts',component: ProductsListDasboardComponent},
  {path:'products/new',component: ProductFormComponent},
  {path:'admincategories',component: CategoryListDashboardComponent},
  {path:'category/new',component:CategoryFormDashboardComponent},
  {path:'adminbrands',component:BrandListDashboardComponent},
  {path:'adminusers',component:UsersListAdminDashboardComponent},
  {path:'adminorders',component:OrdersListDashboardComponent},
  {path:'adminreviews',component:ReviewsListAdminDashboardComponent},
  {path:'adminContactUs',component:ContactAdminDashboardComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
