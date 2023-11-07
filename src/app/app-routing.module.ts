import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Core/Home/home/home.component';
import { ContactusComponent } from './Components/Core/contactus/contactus.component';
import { LoginComponent } from './Components/Core/login/login.component';
import { RegisterComponent } from './Components/Core/register/register.component';
import { BlogComponent } from './Components/Core/blog/blog.component';
import { ProfileComponent } from './Components/Core/profile/profile.component';
import { ProductListComponent } from './Components/Core/product-list/product-list.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'contactus', component:ContactusComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'blog', component:BlogComponent},
  {path:'profile', component:ProfileComponent},
  {path:'products', component:ProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
