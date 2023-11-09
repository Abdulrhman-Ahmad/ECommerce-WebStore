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

}

logout(){
  localStorage.removeItem('token');
  this.router.navigate(['login'])

}

}
