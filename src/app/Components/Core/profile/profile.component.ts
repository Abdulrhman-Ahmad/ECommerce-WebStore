import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimsService } from 'src/app/Services/claims.service';
import { CurrentuserService } from 'src/app/Services/currentuser.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public data : CurrentuserService, private claim : ClaimsService, private router:Router){}

ngOnInit(): void {
  let token = localStorage.getItem('token')
  if (token) {
    let claims = JSON.parse(window.atob(token.split('.')[1]));
    this.data.CurrentUser.GivenName = claims[this.claim.claimTypes.GivenName]
    this.data.CurrentUser.Name = claims[this.claim.claimTypes.Name]
    this.data.CurrentUser.StreetAddress = claims[this.claim.claimTypes.StreetAddress]
    this.data.CurrentUser.MobilePhone = claims[this.claim.claimTypes.MobilePhone]
    this.data.CurrentUser.Email = claims[this.claim.claimTypes.Email]
    this.data.CurrentUser.Role = claims[this.claim.claimTypes.Role]
    }

}

logout(){
  localStorage.removeItem('token');
  this.router.navigate(['login'])

}

}
