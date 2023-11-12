import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClaimsService } from 'src/app/Services/claims.service';
import { CurrentuserService } from 'src/app/Services/currentuser.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public log: LoginService, public data: CurrentuserService, private claim: ClaimsService, private router:Router) { }


  logout() {
    localStorage.removeItem('token');
    this.log.IsLoggedIn.next(false)
    this.router.navigate(['login'])
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');

    if (token) {

      // in case there is a token then the login button will disappear
      this.log.IsLoggedIn.next(true);

      // we get the name of the logged in user from the token claims in case it stored in the browser
      let claims = JSON.parse(window.atob(token.split('.')[1]));
      this.log.CurrentUserName.next(claims[this.claim.claimTypes.GivenName])
    }
    else
      this.log.IsLoggedIn.next(false);
  }

  CheckLog(s:string){
    if (this.log.IsLoggedIn.value)
    {
      this.router.navigate([s])
    }
    else
    {
      this.router.navigate(['login'])
    }
  }

}
