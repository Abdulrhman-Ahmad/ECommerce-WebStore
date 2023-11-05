import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './Components/Core/product-list/product-list.component';
import { ProductDetailsComponent } from './Components/Core/product-details/product-details.component';
import { CheckoutComponent } from './Components/Core/checkout/checkout.component';
import { LoginComponent } from './Components/Core/login/login.component';
import { RegisterComponent } from './Components/Core/register/register.component';
import { ProfileComponent } from './Components/Core/profile/profile.component';
import { CartComponent } from './Components/Core/cart/cart.component';
import { CustomerOrderHistoryComponent } from './Components/Core/customer-order-history/customer-order-history.component';
import { CustomerOrderDetailComponent } from './Components/Core/customer-order-detail/customer-order-detail.component';
import { ReviewListComponent } from './Components/Core/review-list/review-list.component';
import { ReviewWriteComponent } from './Components/Core/review-write/review-write.component';
import { InventoryDashboardComponent } from './Components/Core/inventory-dashboard/inventory-dashboard.component';
import { UsersListDashboardComponent } from './Components/Core/users-list-dashboard/users-list-dashboard.component';
import { ProductsListDasboardComponent } from './Components/Core/products-list-dasboard/products-list-dasboard.component';
import { ReviewsListDashboardComponent } from './Components/Core/reviews-list-dashboard/reviews-list-dashboard.component';
import { WishlistUserDashboardComponent } from './Components/Core/wishlist-user-dashboard/wishlist-user-dashboard.component';
import { FavoritesUserDashboardComponent } from './Components/Core/favorites-user-dashboard/favorites-user-dashboard.component';
import { ShippingComponent } from './Components/Core/shipping/shipping.component';
import { RecommendedProductsComponent } from './Components/Core/recommended-products/recommended-products.component';
import { CrossSellComponent } from './Components/Core/cross-sell/cross-sell.component';
import { NavbarComponent } from './Components/Shared/navbar/navbar.component';
import { FooterComponent } from './Components/Shared/footer/footer.component';
import { ContactusComponent } from './Components/Core/contactus/contactus.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    CartComponent,
    CustomerOrderHistoryComponent,
    CustomerOrderDetailComponent,
    ReviewListComponent,
    ReviewWriteComponent,
    InventoryDashboardComponent,
    UsersListDashboardComponent,
    ProductsListDasboardComponent,
    ReviewsListDashboardComponent,
    WishlistUserDashboardComponent,
    FavoritesUserDashboardComponent,
    ShippingComponent,
    RecommendedProductsComponent,
    CrossSellComponent,
    NavbarComponent,
    FooterComponent,
    ContactusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
