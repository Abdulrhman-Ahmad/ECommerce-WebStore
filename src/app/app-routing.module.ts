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
//import { GeneralInformationComponent } from './Components/Core/user profile/general-information/general-information.component';
import { AddressComponent } from './Components/Core/user profile/address/address.component';
import { AddAddressComponent } from './Components/Core/user profile/add-address/add-address.component';
import { GeneralInformationComponent } from './Components/Core/user profile/general-information/general-information.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'contactus', component:ContactusComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'blog', component:BlogComponent},
  {path:'profile', component:ProfileComponent},
  {path:'Address', component:AddressComponent},
  {path:'Add', component:AddAddressComponent},
  {path:'products', component:ProductListComponent},
  {path:'General', component:GeneralInformationComponent},
  {path:'cart', component:CartComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
